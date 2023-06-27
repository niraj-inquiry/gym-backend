'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsersSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  post_code: {
    type: String
  },
  description: {
    type: String
  },
  gender: {
    type: String
  },

  created_date: {
    type: Date,
    default: Date.now
  },
  user_type: {
    type: String,
    default: "User"
  },
  verify_status: {
    type: Boolean,
    default: false
  },
  photo:{type:String},

  created_by_userid:{type:String},
  dob:{type:String},
  contactnumber:{type:String},
  workpostcode:{type:String},
  homepostcode:{type:String}
});

module.exports = mongoose.model('Users', UsersSchema);