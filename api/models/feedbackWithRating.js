'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FeedbackWithRatingSchema = new Schema({
  rating: {
    type: Number,
    default:0
  },
  feedback_by_userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users'
  },
  centerid: {
    type: mongoose.Schema.ObjectId,
    ref: 'GymCenters',
  },
  comment: { type: String },
  like: { type: Boolean,default:false },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FeedbackWithRating', FeedbackWithRatingSchema);