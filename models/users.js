var mongoose                = require("mongoose")
var passportLocalMongoose   = require("passport-local-mongoose")
var validators              = require('validator')

var userSchema = new mongoose.Schema({
    username:   {type:String, required:true, unique:true},
    password:   {type:String}, 
    email:      {type:String, unique:true, lowercase:true, validate:[(val)=>{return validators.isEmail(val)},"Please provide a accurate email."]},
    avatar:     {type: String, default: "https://res.cloudinary.com/dbjw5nvs2/image/upload/v1588030256/blank-profile-picture-973460_640_kb8bgf.png" },
    bookmarks:  [{type: mongoose.Schema.Types.ObjectId,ref:'campgrounds'}],
    reviewCount: {type: Number, default: 0}
})

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("users",userSchema)
