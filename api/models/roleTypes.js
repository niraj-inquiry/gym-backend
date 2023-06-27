'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RoleTypesSchema = new Schema({
    rolename:{type:String},
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('RoleTypes', RoleTypesSchema);