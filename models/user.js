const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
