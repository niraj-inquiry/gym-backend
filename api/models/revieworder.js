'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RevieworderSchema = new Schema({
  userid:{type:String},
  selectvendorid:{type:String},
  selectplanid:{type:String},
  data:{type:Object},
  
  created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Revieworder', RevieworderSchema);