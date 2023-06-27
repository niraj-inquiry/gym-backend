const FeedbackWithRating = require('../models/feedbackWithRating')

const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const {  generateRandom, isEmpty, getrating } = require('../../generalfunction');
require('dotenv').config

exports.delete_feedback_feedid=asyncHandler(async(req,res)=>{
    const feedid=req.params.feedid
    const removeres=await FeedbackWithRating.deleteMany({_id:new mongoose.Types.ObjectId(feedid)})
    if(removeres?.acknowledged===true && removeres?.deletedCount>0){
        res.status(200).send({ status: true, data: removeres, message: "Successfully Deleted" })
    }
    else{
        res.status(200).send({ status: false, data: removeres, message: "Data does not exist" })

    }
})
exports.delete_Allfeedback=asyncHandler(async(req,res)=>{
const removeres=await FeedbackWithRating.deleteMany()

if(removeres.acknowledged>0&&removeres?.deletedCount>0){
    res.status(200).send({ status: true, data: removeres, message: "Successfully Deleted All Data" })
}
else{
    res.status(200).send({ status: false, data: removeres, message: "No Data" })
}
})
exports.add_feedbackwithrating = asyncHandler(async (req, res) => {
    try {
        const { 
            rating,
            feedback_by_userid,
              centerid,
              comment,
              like,
        } = req.body


        const userdata= await FeedbackWithRating.find({
            feedback_by_userid:feedback_by_userid,
            centerid:centerid
        })
       console.log("dddddddddd",userdata)
        if(userdata?.length>0){
            const upres = await FeedbackWithRating.updateOne(
                {_id:new mongoose.Types.ObjectId(userdata[0]?._id)},
                {$set:{
                    rating:rating??rating,
                    feedback_by_userid:feedback_by_userid??feedback_by_userid,
                    centerid:centerid??centerid,
                    comment:comment??comment,
                    like:like??like,
                }}
                )
                res.status(200).send({ status: true,  message: "Successfully update" })
             
        }
        else{
           const createres = await FeedbackWithRating.create({
    rating,
    feedback_by_userid,
    centerid,
    comment,
    like,
})
res.status(200).send({ status: true, data: createres, message: "Successfully Add" })
        }



    }
    catch (err) {
        console.log("error", err)
    }
})


exports.get_all_feedbackwithrating = asyncHandler(async (req, res) => {

    const feedinfo = await FeedbackWithRating.aggregate([
         {
              
                    $lookup: {
                        from: "users",
                        localField: "feedback_by_userid",
                        foreignField:"_id" ,
                        as: "userdata"
                    },
                   
                },

                {
               $lookup: {
                        from: "gymcenters",
                        localField: "centerid",
                        foreignField:"_id" ,
                        as: "gymcenterdata"
                    },
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$userdata", 0 ] },{$arrayElemAt: [ "$gymcenterdata", 0 ]}, "$$ROOT" ] } }
                 },
                 { $project: { userdata: 0,gymcenterdata:0 } },
                 {$sort:{created_date:-1}},
            ])
         
     
    if (feedinfo?.length > 0) {
        res.status(200).send({ status: true, data: feedinfo })
    }
    else {
        res.status(200).send({ status: false, data: feedinfo })
    }
})


exports.get_feedbackby_centerid=asyncHandler(async(req,res)=>{
   console.log("res---------",req.params.centerid)
    const centerid=req.params.centerid
    const feedinfo = await FeedbackWithRating.aggregate([
        {
             
                   $lookup: {
                       from: "users",
                       localField: "feedback_by_userid",
                       foreignField:"_id" ,
                       as: "userdata"
                   },
                  
               },

               {
              $lookup: {
                       from: "gymcenters",
                       localField: "centerid",
                       foreignField:"_id" ,
                       as: "gymcenterdata"
                   },
               },
           {
                   $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$userdata", 0 ] },{$arrayElemAt: [ "$gymcenterdata", 0 ]}, "$$ROOT" ] } }
                },
                { $project: { userdata: 0,gymcenterdata:0 } },
                {
                    $match:{centerid:new mongoose.Types.ObjectId(centerid)}
                    },
                    {$sort:{created_date:-1}}
   ])

   
   if(feedinfo.length>0){

  const rating= getrating(feedinfo)
  
    res.status(200).send({status:true,rating:rating,data:feedinfo})
   }
   else{
    res.status(200).send({status:false,data:feedinfo})
   }
})

// exports.delete_voucher_info = asyncHandler(async (req, res) => {
//     const voucherid = req.params.voucherid
//     const deleteres = await Voucher.deleteOne({ _id: new mongoose.Types.ObjectId(voucherid) })
//     if (deleteres.acknowledged == true && deleteres?.deletedCount > 0) {
//         res.status(200).send({ status: true, message: "Successfully Deleted" })
//     }
//     else {
//         res.status(200).send({ status: false, message: "Unsuccessfully Deleted" })
//     }
// })

// exports.get_voucher_by_code=asyncHandler(async(req,res)=>{
//     const vouchercode=req.params.vouchercode
   
//     const findres = await Voucher.find({ voucharcode: vouchercode})
//     if (findres?.length>0) {
//         res.status(200).send({ status: true, data:findres})
//     }
//     else {
//         res.status(200).send({ status: false,data:findres ,message: "No Data" })
//     }
// })