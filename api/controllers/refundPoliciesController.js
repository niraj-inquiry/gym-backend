const RefundPlan = require('../models/refundPlan')
const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');



exports.delete_policies=asyncHandler(async(req,res)=>{
   
    const deleteres=await RefundPlan.deleteOne({_id:req.params.delete_id})
  if(deleteres.acknowledged===true && deleteres.deletedCount>0){
    res.status(200).send({status:true,message:"Successfully deleted"})
  }
  else{
    res.status(200).send({status:false,message:"Already deleted"})

  }
})

exports.get_all_policies=asyncHandler(async(req,res)=>{
    const response=await RefundPlan.aggregate([
        {
            $lookup: {
              from: "plans",
              localField: "planid",
              foreignField: "_id",
              as: "planinfo"
            }
        }
    ])
   
    if(response.length>0){
        res.status(200).send({status:true,data:response})
    }
    else{
        res.status(200).send({status:false,data:[],message:"No data"})
    }
})

exports.refund_polices = asyncHandler(async (req, res) => {

    const { _id, createdbyuserid, planid,
        refundwithinday,
        refundpercentage,
        status } = req.body

    const findres = await RefundPlan.find({ planid: planid })
    // console.log("findres",_id)
    if (_id!==undefined) {
        const upres = await RefundPlan.updateOne({ _id:new mongoose.Types.ObjectId(_id) }, {
            $set: {
                planid:planid,
                createdbyuserid: createdbyuserid,
                refundwithinday: refundwithinday,
                refundpercentage: refundpercentage,
                status: status
            }
        })
     
        if (upres.acknowledged === true && upres.modifiedCount > 0) {
            res.status(200).send({status:true,message:"Successfully update"})
        }
        else{
            res.status(200).send({status:false,message:"Already updated"})
        }
    }
    else{
        if(findres.length>0){
            res.status(200).send({status:true,data:findres,message:"Already exist"})   
        }
        else{
        const createres = await RefundPlan.create({
            planid:planid,
            createdbyuserid: createdbyuserid,
            refundwithinday: refundwithinday,
                refundpercentage: refundpercentage,
                status: status
           
        })
        res.status(200).send({status:true,data:createres,message:"Successfully created"})
    }
    }
})