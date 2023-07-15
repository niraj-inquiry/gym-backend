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

exports.update_order_by_id = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { transactionId, orderId, date ,userId ,amount,
    passtype,payment_status} = req.body; 

  try {
    const updatedData = await OrderReview.findByIdAndUpdate(
      id,
      {
        amount,
        passtype,
        transactionId,
        orderId,
        date,
        userId,
        payment_status
      },
      { new: true }
    );

    res.status(200).json({
      status: "Order Successfully Updated",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update order" });
  }
});

exports.get_order =asyncHandler( async (req, res)=>{
  
  try {
    const data=await OrderReview.find();
    res.status(200).json({
      status:"Order found by id",
      data:data
    })
  } catch (error) {
    console.log(error);
  }
})

exports.get_order_by_id=asyncHandler( async (req, res)=>{
  const {id}=req.params;
  
  try {
    
    const data=await OrderReview.findById(id)
    res.status(200).json({
      status:"Order Found By Id",
      data:data
    })
  } catch (error) {
    console.log(error);
  }
}

)
