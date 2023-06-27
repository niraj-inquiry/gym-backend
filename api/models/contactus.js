'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactUsSchema = new Schema({
  firstname:{type:String},
  lastname:{type:String},
  email:{type:String},
  phonenumber:{type:String},
  message:{type:String},
  created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);