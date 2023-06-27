var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var GymfaqsSchema = new Schema({
  gymcenterid:{type:mongoose.Schema.ObjectId,
  ref:"Gymfaqs"},
  question:{type:String},
  answer:{type:String},
    created_date: {
     type: Date,
     default: Date.now
 }
});
module.exports = mongoose.model('Gymfaqs', GymfaqsSchema);