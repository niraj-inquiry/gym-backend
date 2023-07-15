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

exports.update_order_by_id=asyncHandler(async(req, res)=>{
  const { id } = req.params;
  try {
    const data=await OrderReview.findByIdAndUpdate({id})
    res.status(200).json({
      status:"Order Successfully Updated",
      data:data
    })
  } catch (error) {
    console.log(error);
  }
})
