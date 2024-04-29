const mongoose = require("mongoose")

const bookedeventsschema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true 
    },
    contact: {
        type: String,
        required: true
      }
  });

const bookedeventsbyclient = mongoose.model('bookedevents', bookedeventsschema);

module.exports = bookedeventsbyclient;