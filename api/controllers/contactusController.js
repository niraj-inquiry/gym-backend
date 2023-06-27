const ContactUs=require('../models/contactus')
const asyncHandler=require('../../middleware/async')


const { default: mongoose } = require('mongoose');

exports.delete_contactus=asyncHandler(async(req,res)=>{
    const deleteres=await ContactUs.deleteOne({_id:new mongoose.Types.ObjectId(req.params.contactid)})
     if(deleteres.acknowledged===true && deleteres.deletedCount>0){
        res.status(200).send({status:true,message:"Successfully Deleted"})
    }
    else{
        res.status(200).send({status:false,message:"Invalid Data"})
    }
})

// exports.updaterolename=asyncHandler(async(req,res)=>{
//     const {_id,rolename}=req.body
   
//     const resfind=await RoleTypes.find({rolename:rolename})
  
//     if(resfind.length>0)
//     {
//         res.status(200).send({status:false,message:"Already Data Exist"})
//     }
//     else{
//     const updateres=await RoleTypes.updateOne({_id:new mongoose.Types.ObjectId(_id)},{
//         $set:{rolename:rolename}
//     })
    
//    if(updateres.modifiedCount>0){
//     res.status(200).send({status:true,message:"Successfully Updated"})
//    }
//    else{
//     res.status(200).send({status:false,message:"Already updated"})
//    }
// }
  
// })
exports.add_contact=asyncHandler(async(req,res)=>{
    const {firstname,
    lastname,
    email,
    phonenumber,
    message}=req.body
  

    
     const creatres=await ContactUs.create({firstname:firstname,
        lastname:lastname,
        email:email,
        phonenumber:phonenumber,
        message:message})
        res.status(200).send({status:true,message:"Successfully added",data:creatres})
   
  
})



exports.get_all_contact=asyncHandler(async(req,res)=>{
 const findres=await ContactUs.find({}).sort({$natural:-1});
 if(findres?.length>0)
 {
   res.status(200).send({status:true,data:findres})
 }
 else{
    res.status(200).send({status:false,data:findres})
 }
})