'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var PlandetailsSchema = new Schema({
    createdbyuserid:{   
        type:mongoose.Schema.ObjectId,
        ref:"Users"
    },
 planname:{type:String},
 aboutus:{type:String},
 rate:{type:String},
 discount:{
    type:Number,
    default:0
},
duration:{
    type:String
},

passtype:{
    type:String
},
country:{
    type:String
},
activestatus: {
      type: Boolean,
      default: true
    },
photo:{
    type:String
},

created_date: {
        type: Date,
        default: Date.now
    },
  usertype:{type:String}

  });
  
  module.exports = mongoose.model('Plans', PlandetailsSchema);