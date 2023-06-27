const Users=require('../models/users')
const GymCenters=require('../models/gymcenters')
const asyncHandler=require('../../middleware/async')
const { default: mongoose } = require('mongoose');

exports.get_all_data=asyncHandler(async(req,res)=>{


const userdatacount=await Users.find().count()
const vendorcount=await GymCenters.find().count()
const userdata=await Users.find({user_type:{$nin:["admin","Admin","superadmin"]}})
const vendordata=await GymCenters.find()

 res.status(200).send({usersdata:userdata,usercount:userdatacount,vendorcount:vendorcount,vendordata:vendordata})
})


exports.getCenterdetail=asyncHandler(async(req,res)=>{
    var searchtext=req.params.searchtext

    const centerdata=await GymCenters.find({
        $or:[
            {pincode:{ $regex: searchtext, $options: 'is'}},
            {address:{ $regex: searchtext, $options: 'is'}}
    
    ]
},{pincode:1,address:1 ,_id:0})

if(centerdata?.length>0){
    res.status(200).send({data:centerdata,status:true})
}
else{
    res.status(200).send({data:centerdata,status:false})
}

})

