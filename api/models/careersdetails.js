'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CareerDetailsSchema = new Schema({
  firstname:{type:String},
  lastname:{type:String},
  email:{type:String},
  phonenumber:{type:String},
  profession:{type:String},
  uploadcv:{type:String},
  created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('CareerDetails', CareerDetailsSchema);