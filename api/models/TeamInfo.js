'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TeamInfoSchema = new Schema({
   first_name:{type:String},
   last_name:{type:String},
   email:{type:String},
   address:{type:String},
   pincode:{type:String},
   occupation:{type:String},
   gender:{type:String},
   description:{type:String},
   country:{type:String},
   state:{type:String},
   district:{type:String},
   photo:{type:String},
   created_date: {
    type: Date,
    default: Date.now
},
});

module.exports = mongoose.model('TeamInfo', TeamInfoSchema);