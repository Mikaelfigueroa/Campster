var mongoose = require("mongoose");
var users = require("./users");

var reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: "Please provide a rating (1-5 stars).", min: 1, max: 5, validate: { validator: Number.isInteger, message: "{VALUE} is not an integer value." } },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "users" },
    campground: { required: true ,type: mongoose.Schema.Types.ObjectId, ref: "campgrounds" }
}, {
    timestamps: true
});

module.exports = mongoose.model("reviews", reviewSchema);