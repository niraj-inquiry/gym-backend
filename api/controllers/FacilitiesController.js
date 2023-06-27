const Facilities=require('../models/facilities')
const asyncHandler=require('../../middleware/async')
const { default: mongoose } = require('mongoose');

exports.add_facilities=asyncHandler(async(req,res)=>{
    const {facilities_name,centerid}=req.body
    const faciltiesres=await Facilities.find({facilities_name:facilities_name,centerid:centerid})
    if(faciltiesres?.length>0){
        this.update_facilities(req,res)
        // res.status(200).send({message:"Already data exist",status:false})
    }
    else{
          const createres=await Facilities.create({facilities_name:facilities_name,centerid:centerid})
          res.status(200).send({message:"Successfully added",status:true,data:createres})
    }

})


exports.get_All_facilities=asyncHandler(async(req,res)=>{
const findres=await Facilities.find({})
if(findres?.length>0){
    res.status(200).send({status:true,data:findres})
}
else{
    res.status(200).send({message:"No data exist",status:false})
}
})

exports.update_facilities=asyncHandler(async(req,res)=>{
   
    const {_id,facilities_name,centerid:centerid}=req.body
    const updateres=await Facilities.updateOne({_id:new mongoose.Types.ObjectId(_id)},{
        $set:{
            facilities_name:facilities_name,
            centerid:centerid
        }
    })

    if(updateres.acknowledged && updateres.modifiedCount>0){
         res.status(200).send({message:"Successfully updated",status:true})
    }
    else{
        res.status(200).send({message:"Already updated",status:false})
    }
})

exports.delete_facilities=asyncHandler(async(req,res)=>{
    const deleteres=await Facilities.deleteMany({_id:new mongoose.Types.ObjectId(req.params.facilities_id)})
    
    if(deleteres.acknowledged===true && deleteres.deletedCount>0){
        res.status(200).send({message:"Successfully Deleted",status:true})
    }
    else{
        res.status(200).send({message:"Already Deleted",status:false})
    }
})