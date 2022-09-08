const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    index: true,
  },
  displayName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  photoURL: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
  role: String,
});

module.exports = userSchema;
