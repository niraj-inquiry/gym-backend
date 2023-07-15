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
  }
})

const orderreview=mongoose.model('orderreview',OrderReview);

module.exports=orderreview;