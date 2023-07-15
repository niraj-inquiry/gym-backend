const OrderReview = require("../models/orderReview");
const asyncHandler=require('../../middleware/async')




exports.createOrder =asyncHandler (async (req, res) => {
  const {
    userId,
    amount,
    passtype,
    centerId,
    vendorId,
    transactionId,
    orderId,
    date,
  } = req.body;
  const data=await OrderReview.create({
    userId,
    amount,
    passtype,
    centerId,
    vendorId,
    transactionId,
    orderId,
    date});
  
    res.status(200).json({
        status:"Order recived successfully",
        data:data
    })
  
});
