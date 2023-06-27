'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var VoucherSchema = new Schema({
  voucharname: {
    type: String
  },
 voucharcode:{type:String},
duration:{type:String},
durationunit:{type:String},
discount:{type:String},
description:{type:String},
status:{type:Boolean,default:true},
created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Voucher', VoucherSchema);