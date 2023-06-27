'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GymEquipmentsSchema = new Schema({
       user_id:{type:mongoose.Schema.ObjectId,
        ref:"Users"},
        gymid:{
            type:mongoose.Schema.ObjectId,
            ref:"GymCenters"
        },
        description:{type:String},
       equipment_name:{type:String},
       equipment_brand:{type:String},
       equipment_image:{type:String},
       equipment_model_number:{type:String},
       created_date: {
        type: Date,
        default: Date.now
    },
    verify_status:{type:Boolean,default:false}
});

module.exports = mongoose.model('GymEquipments', GymEquipmentsSchema);