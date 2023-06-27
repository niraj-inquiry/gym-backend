'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SubscribeSchema = new Schema({
  email: {
    type: String
  },
status:{type:Boolean,default:true},
created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subscribe', SubscribeSchema);