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
  centerName:{
   type:String
  },
  trainerName:{
    type:String
  },
  passStartDate:{
    type:String
   },
  passEndDate:{
   type:String
  },
  bookingSlot:[
    {
      day:String,
      startTime:String,
      endTime:String
    }
  ],
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
    type:String,
    default:'0',
  },
  userName:{
    type:String
  },
  userAddress:{
    type:String
  },
  phone:{
    type:String
  }
  ,
  centerBanner:{
    type:String
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
})

const orderreview=mongoose.model('orderreview',OrderReview);

module.exports=orderreview;