var express = require("express")
var router = express.Router()

var middleware = require("../middleware")
var functions = require("../functions")

var campgrounds = require("../models/campgrounds")
var reviews = require("../models/reviews")
var users = require("../models/users")



function updateCampRating(campid,callback) {
    reviews.find({ campground: campid }, function (err, reviews) {
        if (err) {
            console.log(err)
        }
        campgrounds.findByIdAndUpdate(campid, { rating: functions.calculateAverage(reviews)}).exec(function (err, ratingupdateResult) {
            if (err) {
                console.log(err)
            }
            if(callback){
                callback({rating: ratingupdateResult.rating})
            }
        })
    })
}


router.get("/reviews", function(req,res) {
    reviews.find({}).exec(function (err,result) {
        res.json(result)
    })
})

//create route
router.post("/reviews/:id/", middleware.isloggedin, middleware.checkReviewExistence, function (req, res) {
    req.body.user = req.user._id
    req.body.campground = req.params.id
    reviews.create(req.body, function (err, reviewsresult) {
        if (err) {
            res.status(500)
        }
        else {
            users.findById(req.user._id, function (err, userResult) {
                userResult.reviewCount++
                userResult.save()
                updateCampRating(req.params.id)
                res.send("created")
            })
        }
    })
})

//update
router.put("/reviews/:id/:review_id",middleware.isloggedin, middleware.checkreviewownership, function (req, res) {
    reviews.findByIdAndUpdate(req.params.review_id, { text: req.body.text, rating: req.body.rating }, function (err, review) {
        updateCampRating(req.params.id)
        res.send("updated")
    })
})


//delete route
router.delete("/reviews/:id/:review_id",middleware.isloggedin, middleware.checkreviewownership, function (req, res) {
    reviews.findByIdAndRemove(req.params.review_id, function (err, result) {
        users.findById(req.user._id, function (err, userResult) {
            userResult.reviewCount--
            userResult.save()
            var rating = updateCampRating(req.params.id, function(rating) {
              res.json(rating.rating)
            })
        })
    })
})

module.exports = router
