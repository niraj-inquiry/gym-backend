"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GymCentersSchema = new Schema({
  center_name: {
    type: String,
  },
  address: {
    type: String,
  },
  gstnumber: {
    type: String,
  },
  pannumber: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  district: {
    type: String,
  },
  pincode: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  centerBanner:{
     type:String
  },
  photos: {
    type: [],
  },
  email: {
    type: String,
  },
  centeremail: {
    type: String,
  },
  description: {
    type: String,
  },
  verify_status: {
    type: Boolean,
    default: false,
  },
  centertype: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  created_by_userid: {
    type:String
    
  },
  active_status: {
    type: Boolean,
    default: true,
  },
  equipmentData: [
    {
      equipment_name: String,
      about_us: String,
      equipment_brand: String,
      equipment_modal_number: String,
      equipment_image: String
    }
  ],
  amentitiesData:[
    {
      amentitiesName:String
    }
  ],
  scheduleData:[
   {
    day:String,
    startTime:String,
    endTime:String
   }
  ],
  newTrainerData:[
    {
      tName:String,
      tDay:String,
      tProfile:String,
      tstartTime:String,
      tendTime:String,
      tactivity:String
    }
  ]
});

module.exports = mongoose.model("GymCenters", GymCentersSchema);
