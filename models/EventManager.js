const mongoose = require("mongoose")

const eventmanagerschema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return /^[a-zA-Z. ]+$/.test(value); // Allow alphabets, spaces, and periods
        },
        message: 'Full name should only contain alphabets from a to z (upper or lower case), spaces, and periods'
      }
    },
    brandname:{
        type:String,
        required: true

    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
      },
  });

  const eventdetailsschema=new mongoose.Schema({
    eventid: {
      type: Number,
      unique: true,
      required: true,
      default: () => generateRandomId()
  },
    fullname:{
      type:String,
      required:true,
    },
    brandname:{
      type:String,
      required:true,
    },
    category: {
      type:[String],
      required: true,
      
    },

description: {
  type: String,
  required: true,
},
cost: {
  type: Number,
  required: true,
},
contact:
{
  type:String,
  required:true,
},
file: {
  type: String, 
  required: true,
},
});

function generateRandomId() {
  return Math.floor(Math.random() * 900000) + 100000;
}

  

const eventmanager = mongoose.model('EventManagers', eventmanagerschema,'EventManagers');
const eventdetails= mongoose.model('EventDetails', eventdetailsschema,'EventDetails');

module.exports ={eventmanager,eventdetails};