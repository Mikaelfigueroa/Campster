/*-----------------app dependencies----------------------------------------------------------------------------------*/
require("dotenv").config()
const express = require("express")         //connects express to node.js
const app = express()                  //creates the app object which is everything
const bodyparser = require("body-parser")     //connects body parser which lets us get data from html forms
const mongoose = require("mongoose")        //connects mongoose


const passport = require("passport")        //allows us to use passport js
const localstrategy = require("passport-local").Strategy  //sets the strategy to be used by passport




const functions = require("./functions")
var ejs = require("ejs")


const cookieParser = require("cookie-parser")
const cors = require('cors')

const path = require('path')
const crypto = require('crypto')

var async = require("async")
var nodemailer = require("nodemailer")

var indexRoutes = require("./routes/index")
var postRoutes = require("./routes/campgrounds")
var reviewRoutes = require("./routes/reviews")


const campgrounds = require("./models/campgrounds")
const reviews = require("./models/reviews")
const users = require("./models/users")

var url = process.env.DBURL;
mongoose.connect(url);

/*---------------------etc---------------------------------------------------------------------------------------------------------------------*/


app.locals.moment = require("moment")           //gives access to momment through any part of the application even views
app.use(express.static("public"))               //allows the public folder to be seen
app.use(bodyparser.json({ limit: '10mb', extended: true }))
app.use(bodyparser.urlencoded({ limit: "10mb", extended: true }))


app.use(cors({
  origin: "https://campster1234.herokuapp.com/",
  credentials: true,
}));


app.use(require("express-session")({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

passport.use(new localstrategy(users.authenticate()))


passport.serializeUser(users.serializeUser())
passport.deserializeUser(users.deserializeUser())



/*--------------------------------res.locals---------------------------------------------------------------------------------------------------*/

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.pagename = "Campster"
  res.locals.colorer = functions.colorer
  next()
})

app.use(postRoutes)
app.use(reviewRoutes)
app.use(indexRoutes)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirnanme, "client", "build", "index.html"))
  })
}

var NodeGeocoder = require('node-geocoder')
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.apikey,
  formatter: null
}
var geocoder = NodeGeocoder(options)

app.listen(process.env.PORT || 5000, () => {
  console.log('----------------server is running-----------')
  console.log('|||||||||||||||||||||||||||||||||||||||||||||||')
})