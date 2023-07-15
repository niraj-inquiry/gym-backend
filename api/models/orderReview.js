const mongoose=require('mongoose')

const OrderReview=new mongoose.Schema({
   date:{
    type:String
   },
  orderId:{
    type:String
  },
  transactionId:{
    type:String
  },
  vendorId:{
    type:String
  },
  centerId:{
    type:String
  },
  passtype:{
    type:String
  },
  amount:{
    type:String
  },
  userId:{
    type:String
  },
  payment_status:{
    type:String
  }
  ,
  created_date: {
    type: Date,
    default: Date.now,
  },
})

const orderreview=mongoose.model('orderreview',OrderReview);

module.exports=orderreview;