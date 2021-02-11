const campgrounds = require("../models/campgrounds")
const reviews = require("../models/reviews")
const users = require("../models/users")

var middleware = {}

middleware.checkcampownership = function (req, res, next) {
    if (req.isAuthenticated()) {
        campgrounds.findById(req.params.id, function (err, results) {
            if (err || !results) {
                res.status(500)
            }
            else {
                if (results.user._id.equals(req.user._id)) {
                    next()
                }
                else {
                    res.status(500)
                }
            }
        })
    }
    else {
        res.status(500)
    }
}

middleware.checkreviewownership = function (req, res, next) {
    if (req.isAuthenticated()) {
        reviews.findById(req.params.review_id, function (err, results) {
            if (err || !results) {
                res.status(500)
            }
            else {
                if (results.user.equals(req.user._id)) {
                    next()
                }
                else {
                    res.status(500)
                }
            }
        })
    }
    else {
        res.status(500)
    }
}

middleware.checkReviewExistence = function (req, res, next) {
    reviews.find({ user: req.user._id, campground: req.params.id }).exec(function (err, campgroundsresult) {
        if (err) {
            res.status(500)
        }
        else if (campgroundsresult.length > 0) {
            res.status(500).send("owned review");
        }
        else {
            next()
        }
    });
}

middleware.isloggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    else {
        res.status(500).send("Oops something went wrong")
    }
}


module.exports = middleware
