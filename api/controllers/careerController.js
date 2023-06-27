const CareerDetails=require('../models/careersdetails')
const asyncHandler=require('../../middleware/async')


const { default: mongoose } = require('mongoose');

exports.delete_careerdetail=asyncHandler(async(req,res)=>{
    const deleteres=await CareerDetails.deleteOne({_id:new mongoose.Types.ObjectId(req.params.careerid)})
     if(deleteres.acknowledged===true && deleteres.deletedCount>0){
        res.status(200).send({status:true,message:"Successfully Deleted"})
    }
    else{
        res.status(200).send({status:false,message:"Invalid Data"})
    }
})

exports.get_career_all_data=asyncHandler(async(req,res)=>{
    const findres=await CareerDetails.find().sort({created_date:-1});
    if(findres.length>0){
        res.status(200).send({data:findres,status:true})
    }
    else{
        res.status(200).send({data:findres,status:false})
    }
})

exports.add_career_details=asyncHandler(async(req,res)=>{
    const {
        firstname,
    lastname,
    email,
    phonenumber,
    profession}=req.body
  
    console.log("body",req.body,req.file)
const fndres=await CareerDetails.find({email:email})

var creatres;
if(fndres.length>0){
creatres=await CareerDetails.updateOne({email:email},{$set:{
    firstname:firstname,
    lastname:lastname,
      phonenumber:phonenumber,
        profession:profession,
        uploadcv :req?.file?.path?.replaceAll("\\","/"),
        created_date:Date.now()

}})
if(creatres.acknowledged===true&&creatres.modifiedCount>0)
{
    let resdata=await CareerDetails.find().sort({created_date:-1}).limit(1)
  res.status(200).send({status:true,message:"Successfully Updated",data:resdata})
}
else{
    let resdata=await CareerDetails.find().sort({created_date:-1}).limit(1)
    res.status(200).send({status:true,message:"Already updated",data:resdata})
}
}
else{
    creatres=await CareerDetails.create({firstname:firstname,
        lastname:lastname,
        email:email,
        phonenumber:phonenumber,
        profession:profession,
        uploadcv :req?.file?.path?.replaceAll("\\","/")

    })
    res.status(200).send({status:true,message:"Successfully added",data:creatres})
}
})