const RoleTypes=require('../models/roleTypes')
const asyncHandler=require('../../middleware/async')


const { default: mongoose } = require('mongoose');

exports.deleterolename=asyncHandler(async(req,res)=>{
    const deleteres=await RoleTypes.deleteOne({_id:new mongoose.Types.ObjectId(req.params.roleid)})
     if(deleteres.acknowledged===true && deleteres.deletedCount>0){
        res.status(200).send({status:true,message:"Successfully Deleted"})
    }
    else{
        res.status(200).send({status:false,message:"Invalid Data"})
    }
})

exports.updaterolename=asyncHandler(async(req,res)=>{
    const {_id,rolename}=req.body
   
    const resfind=await RoleTypes.find({rolename:rolename})
  
    if(resfind.length>0)
    {
        res.status(200).send({status:false,message:"Already Data Exist"})
    }
    else{
    const updateres=await RoleTypes.updateOne({_id:new mongoose.Types.ObjectId(_id)},{
        $set:{rolename:rolename}
    })
    
   if(updateres.modifiedCount>0){
    res.status(200).send({status:true,message:"Successfully Updated"})
   }
   else{
    res.status(200).send({status:false,message:"Already updated"})
   }
}
  
})
exports.addRole=asyncHandler(async(req,res)=>{
    const {rolename}=req.body;
    console.log(rolename);
    // const findres=await RoleTypes.find({rolename:rolename})
    // if(findres.length===0){
    //     const creatres=await RoleTypes.create({rolename:rolename})
    //     res.status(200).send({status:true,message:"Successfully added",data:creatres})
    // }
    // else{
    //     res.status(200).send({status:false,message:"Already exist"})
    // }

    const data=await RoleTypes.create({rolename});
    res.status(200).json({
        status:"role created",
        data:data
    })
  
})



exports.getAllRole=asyncHandler(async(req,res)=>{
 const findres=await RoleTypes.find({})
 if(findres?.length>0)
 {
   res.status(200).send({status:true,data:findres})
 }
 else{
    res.status(200).send({status:false,data:findres})
 }
})

exports.getroll=asyncHandler(async(req,res)=>{
    const findres=await RoleTypes.find({rolename:{$nin:["super","admin"]}})
    if(findres?.length>0)
    {
      res.status(200).send({status:true,data:findres})
    }
    else{
       res.status(200).send({status:false,data:findres})
    }
   })