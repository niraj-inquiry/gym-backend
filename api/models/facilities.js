'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FacilitiesSchema = new Schema({
  facilities_name:{type:String},
 centerid:{
  type:mongoose.Schema.ObjectId,
  ref:"GymCenters"
},
  created_date: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Facilities', FacilitiesSchema);