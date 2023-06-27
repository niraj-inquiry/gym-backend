'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GymCenterDetailsSchema = new Schema({
    created_by_userid:{ 
        type: mongoose.Schema.ObjectId,
        ref: 'Users'},
    gymcenterid: {
        type: mongoose.Schema.ObjectId,
        ref: 'GymCenters',
    },
    aboutus: {
        type: String
    },
    gymeequipments: {
        type: []
    
    },
    gymamenities: {
        type: []
    },
    gymopenhours: {
        type: []
    },
    
    gymfacilities: [
        // {
        // type: mongoose.Schema.ObjectId,
        //  ref: 'SportTrainer'
        // }
    ],

    gymtrainer:[],
    created_date: {
        type: Date,
        default: Date.now()
    },
    verify_status:{type:Boolean,default:false}

});

module.exports = mongoose.model('GymCenterDetails', GymCenterDetailsSchema);