'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SportTrainerSchema = new Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Users"
    },
    gym_id:{
        type:mongoose.Schema.ObjectId,
        ref:"GymCenters"
    },
    avalibility:{
        type:[{
            day_name:{type:String},
            hours:{type:String}
        }]
    },
  
    created_date: {
        type: Date,
        default: Date.now
    },


});

module.exports = mongoose.model('SportTrainer', SportTrainerSchema);