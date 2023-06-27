var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var MemberOfPlanAccountSchema = new Schema({
    userid:{ 
      type:mongoose.Schema.ObjectId,
      ref:"Users"},
    selectvendorid:{
        type:mongoose.Schema.ObjectId,
        ref:"GymCenters"
    },
    selectplanid:{
        type:mongoose.Schema.ObjectId,
        ref:"Plans"
 },
   paymentstatus:{type:Boolean,default:false},
   requestofrefund:{type:Boolean,default:false},
   requestofrefunddate:{type: Date},
    totalamount:{type:String},

    created_date: {
      type: Date,
      default: Date.now()
    },
});
module.exports = mongoose.model('MemberOfPlanAccount', MemberOfPlanAccountSchema);