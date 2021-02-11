var mongoose    = require("mongoose")
var functions   = require("../functions")


var campgroundsSchema = new mongoose.Schema({
    name:       {type:String,   required:true,set:functions.capitalize},
    image:      {type:String,   required:true,},
    cost:       {type:String,   required:true,validate:[(val)=>{return typeof Number(val)=="number"},"Please Provide a number"]},
    desc:       {type:String,   required:true},
    createdAt:  {type: Date,    default: Date.now},
    location:   {type: String, required:true},
    lat:        {type: Number, required: true},
    lng:        {type: Number, required: true},
    user:       {type:mongoose.Schema.Types.ObjectId,ref:"users", required: true},
    rating:     {type: Number,default: 0}
})

module.exports = mongoose.model("campgrounds", campgroundsSchema)