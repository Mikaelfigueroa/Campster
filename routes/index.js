require("dotenv").config()
var express = require("express")
var router = express.Router()
var passport = require("passport")
var async = require("async")
var nodemailer = require("nodemailer")
var crypto = require("crypto")
var functions = require("../functions")
var path = require('path')
var mongoose = require('mongoose')
var users = require("../models/users")
var reviews = require("../models/reviews")
var middleware = require("../middleware")
var uploader = require("../upload")
var ejs = require("ejs")

//-----------------------------register logic------------------------------------------//


router.post("/register", function (req, res) {
  console.log("---------------------------")
  console.log("register hit")
  console.log("---------------------------")

  var newuser = new users({
    username: req.body.username,
    email: req.body.email,
  })
  users.register(newuser, req.body.password, function (err, userResult) {
    if (err) {
      res.status(500).send(functions.mongooseFormat(err))
    }
    else {
      passport.authenticate("local")(req, res, function () {
        res.json(userResult);
      })
    }
  })
})

//-------------------------------login logic--------------------------------------------//


router.post('/login', function (req, res, next) {
  console.log("---------------------------")
  console.log("login hit")
  console.log("---------------------------")

  passport.authenticate('local', function (err, userResult) {
    if (!userResult || err) {
      res.status(500).send("Username or password are incorrect")
    } else {
      req.logIn(userResult, function (err) {
        return res.json(userResult);
      })
    }
  })(req, res, next)
})

//--------------------------------logout-------------------------------------------------//
router.get("/logout", function (req, res) {
  req.logout()
  res.json(true)
})



router.get("/profile/:id", middleware.isloggedin, (req, res) => {
  reviews.find({ user: req.params.id }).populate({ path: "user", select: "username avatar" }).populate({ path: "campground", select: "image name" }).exec(function (err, reviewsResult) {
    users.findById(req.params.id).exec(function(err,userResult) {
      res.json({reviews:reviewsResult, user: userResult})
    })
  })
})


router.put("/user", middleware.isloggedin, uploader.upload.single('image'), function (req, res) {
  if (req.file) {
    uploader.cloudinary.uploader.upload(req.file.path, function (imageResult) {
      users.findById(req.user._id, function (err, userResult) {
        userResult.avatar = imageResult.secure_url
        userResult.save()
        res.json(userResult)
      })
    })
  }
  else {
    res.status(500).send("something went wrong")

  }
})


router.put("/avatar", middleware.isloggedin, uploader.upload.single("avatar"), (req, res, next) => {
  uploader.cloudinary.uploader.upload(req.file.path, function (imageResult) {
    users.findByIdAndUpdate(req.user, { avatar: imageResult.secure_url }, function (err, result) {
      if (err) {
        res.json(false)
      }
      res.json(result)
    })
  })
})

router.get("/bookmarks",middleware.isloggedin,function(req,res) {
  users.findById(req.user._id).populate("bookmarks").exec(function(err,result) {
    console.log("bookmark trig")
    console.log(result)

    res.json(result.bookmarks)
  })
})

router.post("/bookmarks/:id",middleware.isloggedin,function(req,res) {
  users.findById(req.user._id).populate("bookmarks").exec(function(err,result) {
    var found = result.bookmarks.find(bookmark => bookmark._id.equals(req.params.id))
    if(found){
      result.bookmarks.splice(result.bookmarks.indexOf(found),1)
      result.save()
      res.send("done")
    }
    else{
      result.bookmarks.push(req.params.id)
      result.save()
      res.send("done")
    }
  })
})


router.get("/isloggedin", function (req, res) {
  if (req.user) {
    res.send({
      username: req.user.username,
      _id: req.user._id,
      avatar: req.user.avatar,
      bookmarks: req.user.bookmarks
    })
  }
  else {
    res.send(false)
  }
})


module.exports = router