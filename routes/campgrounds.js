require("dotenv").config()
var express = require("express")
var router = express.Router()
var passport = require("passport")


var middleware = require("../middleware")
var uploader = require("../upload")

var campgrounds = require("../models/campgrounds")
var reviews = require("../models/reviews")


var NodeGeocoder = require('node-geocoder')
var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.apikey,
    formatter: null
}
var geocoder = NodeGeocoder(options)
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}


// Index Route
router.get("/campgrounds", function (req, res) {
    campgrounds.find({}).exec(function (err, result) {
        console.log("index route")
        res.json(result)
    })
})

//search route
router.post("/campgrounds/search", function (req, res) {
    const regex = new RegExp(escapeRegex(req.body.search), 'gi')
    campgrounds.find({ $or: [{ name: regex }, { desc: regex }] }, function (err, allCampgrounds) {
        if (err) {
            res.json(false)
        } else {
            res.json(allCampgrounds)
        }  
    })
})

// Create Route
router.post("/campgrounds", middleware.isloggedin, uploader.upload.single("image"), function (req, res) {
    if (req.file) {
        uploader.cloudinary.uploader.upload(req.file.path, function (imageResult) {
            geocoder.geocode(req.body.location, function (err, data) {
                if (err || !data.length) {
                    res.status(500).send("Address was not found. please try again")
                }
                else {
                    var newCampground = {
                        name: req.body.name,
                        image: imageResult.secure_url,
                        cost: req.body.cost,
                        desc: req.body.desc,
                        user: req.user._id,
                        lat: data[0].latitude,
                        lng: data[0].longitude,
                        location: data[0].formattedAddress
                    }
                    campgrounds.create(newCampground, function (err, result) {
                        if (err) {
                            res.status(500).send("something went wrong")
                        }
                        else {
                            res.json(result)
                        }
                    })
                }
            })

        })
    }
    else {
        res.json(false)
    }
})


// Show Route
router.get("/campgrounds/:id", function (req, res) {
    campgrounds.findById(req.params.id).exec(function (err, campgroundsresult) {
        reviews.find({ campground: req.params.id }).populate({ path: "user", select: "username avatar reviews reviewCount" }).exec(function (err, reviewsResult) {
            if (err) {
                res.status(500).send("something went wrong")
            }
            else{
                res.send({ campground: campgroundsresult, reviews: reviewsResult })
            }
        })
    })
    
})


//Update Route
router.put("/campgrounds/:id", middleware.checkcampownership, uploader.upload.single("image"), function (req, res) {
    campgrounds.findById(req.params.id, function (err, campgroundsResult) {
        if(!req.body.cost || !req.body.desc){
            res.status(500)
        }
        var campgroundEdit = {
            cost: req.body.cost,
            desc: req.body.desc
        }
        async function setter() {
            if (req.file) {
                await uploader.cloudinary.uploader.upload(req.file.path, function (imageResult) {
                    campgroundEdit.image = imageResult.secure_url
                })
            }
            campgrounds.findByIdAndUpdate(req.params.id, campgroundEdit, function (err, editResult) {
                if (err) {
                    res.json(false)
                }
                else {
                    res.json(editResult)
                }
            })
        }
        setter()
    })
})

//Destroy Route
router.delete("/campgrounds/:id", middleware.checkcampownership, function (req, res) {
    campgrounds.findByIdAndRemove(req.params.id, function (err, campground) {
        if (err) {
            res.json(false)
        }
        else {
            reviews.remove({ "_id": { $in: campground.reviews } }, function (err) {
                if (err) {
                    res.json(false);
                }
                else {
                    res.json("campground removed");
                }
            })
        }
    })
})

module.exports = router