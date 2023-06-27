const express=require('express')
const router=express.Router()

const Member=require('../models/CreateMember')


router.post('/create-member', async(req, res)=>{
   
    try {
        const {center_type,name,email,phone,address,county,state,district}=req.body;
        const data=await Member.create({center_type,name,email,phone,address,county,state,district});
        res.status(200).json({
            status:"Member create",
            data:data
        })
    } catch (error) {
        console.log(error);
    }

} )
module.exports=CreateMember;