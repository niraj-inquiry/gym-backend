'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RefundPlanSchema = new Schema({
createdbyuserid:{ 
    type:mongoose.Schema.ObjectId,
    ref:"Users"
},
planid:{
    type:mongoose.Schema.ObjectId,
    ref:'Plans'
},
refundwithinday:{
    type:String
},
refundpercentage:{type:String},
status:{type:Boolean},
created_date: {
    type: Date,
    default: Date.now
},

})

module.exports = mongoose.model('RefundPlan', RefundPlanSchema);