var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
var userSchema = new mongoose.Schema({
    username: String,
    password: String, 
    firstname: String,
    lastname: String,
    email: String,
    sex: String,
    height: Number,
    weight: Number
})
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", userSchema)