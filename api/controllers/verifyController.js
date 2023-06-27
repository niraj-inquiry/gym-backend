const Users=require('../models/users')
const GymCenters=require('../models/gymcenters')
const GymCenterDetails=require('../models/gymcenterdetails')
const asyncHandler=require('../../middleware/async')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const { default: mongoose } = require('mongoose');

require('dotenv').config


exports.verify_vendor_by_admin=asyncHandler(async(req,res)=>{
    try{
        const gymcenter_id=req.params.gymcenter_id
        let gymdetails=await GymCenters.findOne({_id:new mongoose.Types.ObjectId(gymcenter_id)})
     
        if( gymdetails.verify_status===false)
         {

       let verifyupdateres=await Users.updateOne({_id:new mongoose.Types.ObjectId(gymdetails.created_by_userid)},{
            $set:{verify_status:true} })
       let verifygymid=await GymCenters.updateOne({_id:new mongoose.Types.ObjectId(gymcenter_id)},{
                $set:{verify_status:true,created_by_userid:gymdetails?.created_by_userid} })
              
     let verifygymcenterdetails=await GymCenterDetails.updateOne({_id:new mongoose.Types.ObjectId(gymdetails?._id)},{
                    $set:{verify_status:true,created_by_userid:gymdetails?.created_by_userid} })
            //   console.log("Ddddddddddd",verifygymcenterdetails)     
            if(verifygymcenterdetails.acknowledged===true && verifygymcenterdetails.modifiedCount>0){
              
                res.status(200).send({status:true,message:"Successfull verify"})
            }
      
        else{
            res.status(200).send({status:false,message:"Already verified user"})
        }
    }
}
    catch(err){
        res.status(200).send({status:false,message:"Something went wrong"})
    }
})


exports.unverified_vendor_by_admin=asyncHandler(async(req,res)=>{
    try{
        const gymcenter_id=req.params.gymcenter_id
        let gymdetails=await GymCenters.findOne({_id:new mongoose.Types.ObjectId(gymcenter_id)})

        if( gymdetails.verify_status===true)
         {

       let verifyupdateres=await Users.updateOne({email:gymdetails.email},{
            $set:{verify_status:false} })
            console.log("verifyupdates",verifyupdateres)
       let verifygymid=await GymCenters.updateOne({_id:new mongoose.Types.ObjectId(gymcenter_id)},{
                $set:{verify_status:false} })
     let verifygymcenterdetails=await GymCenterDetails.updateOne({_id:new mongoose.Types.ObjectId(gymdetails?._id)},{
                    $set:{verify_status:false,created_by_userid:gymdetails?.created_by_userid} })
             
            if(verifygymcenterdetails.acknowledged===true && verifygymcenterdetails.modifiedCount>0){
              
                res.status(200).send({status:true,message:"Successfull verify"})
            }
      
        else{
            res.status(200).send({status:false,message:"Already verified user"})
        }
    }
}
    catch(err){
        res.status(200).send({status:false,message:"Something went wrong"})
    }
})

exports.get_gym_data=asyncHandler(async(req,res)=>{
    const { gymcenterid } = req.body
    const gymdata=GymCenterDetails.aggregate([
        {
            $lookup: {
                from: "gymcenters",
                localField: "gymcenterid",
                foreignField: "_id",
                as: "gymcenterinfo"
            },
    
        },
    ])
    console.log("unverify",gymdata)
})