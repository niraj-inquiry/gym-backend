const asyncHandler=require('../../middleware/async')
const { default: mongoose } = require('mongoose');
const MemberOfPlanAccount = require('../models/memberofplanaccount');
const Plan = require('../models/plandetails');


exports.get_all_details=asyncHandler(async(req,res)=>{
    var venderdata=await MemberOfPlanAccount.find({})
    res.status(200).send({status:true,data:venderdata})
})
exports.get_vendor_details=asyncHandler(async(req,res)=>{
    var selectvendorid=req.params.selectvendorid
    console.log("req.params.selectvendorid",selectvendorid)
    try{
        const detailres=await MemberOfPlanAccount.aggregate([
              {
                  $lookup: {
                    from: "users",
                    localField: "userid" ,
                    foreignField: "_id",
                    as: "userinfo"
                  },
              },
              {
                  $lookup: {
                      from: "plans",
                      localField: "selectplanid" ,
                      foreignField: "_id",
                      as: "planinfo"
                    },
                  },
                  {
                    $lookup: {
                      from: "gymcenters",
                      localField: "selectvendorid" ,
                      foreignField: "_id",
                      as: "vendorinfo"
                    }  
          
              },{
                  $match:{selectvendorid:new mongoose.Types.ObjectId(selectvendorid)}
                  },
              
          ])
       if(detailres.length>0){
                  res.status(200).send({status:true,data:detailres})
              }
              else{
                  res.status(200).send({status:false,data:detailres,message:"No Data"})
              }
      }
      catch(err){
          console.log("Error",err)
      }
})


// todo create api for history get member details 
exports.get_member_details=asyncHandler(async(req,res)=>{
    var userid=req.params.userid
 try{
      const detailres=await MemberOfPlanAccount.aggregate([
            {
                $lookup: {
                  from: "users",
                  localField: "userid" ,
                  foreignField: "_id",
                  as: "userinfo"
                },
            },
            {
                $lookup: {
                    from: "plans",
                    localField: "selectplanid" ,
                    foreignField: "_id",
                    as: "planinfo"
                  },
                },
                {
                  $lookup: {
                    from: "gymcenters",
                    localField: "selectvendorid" ,
                    foreignField: "_id",
                    as: "vendorinfo"
                  }  
        
            },{
                $match:{userid:new mongoose.Types.ObjectId(userid)}
                },
            
        ])
     if(detailres.length>0){
                res.status(200).send({status:true,data:detailres})
            }
            else{
                res.status(200).send({status:false,data:detailres,message:"No Data"})
            }
    }
    catch(err){
        console.log("Error",err)
    }
})


exports.add_member_plan=asyncHandler(async(req,res)=>{
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try{
        const planres = await MemberOfPlanAccount.find({ userid: req.body.userid ,
                selectvendorid: req.body.selectvendorid,
                selectplanid: req.body.selectplanid,
                paymentstatus:true
            });
         
            if(planres.length>0){
           let plannameres=await Plan.find({_id:new mongoose.Types.ObjectId(req.body.selectplanid)},{planname:1,_id:0})
                if(plannameres.length>0){
                 res.status(200).send({name:plannameres[0]?.planname,status:false,data:planres,message:"Already Purchased"})
}
            }
            else{
                const createres=await MemberOfPlanAccount.create({
                    userid: req.body.userid ,
                selectvendorid: req.body.selectvendorid,
                selectplanid: req.body.selectplanid,
                paymentstatus:true,
                totalamount:req.body.totalamount
                })

                res.status(200).send({status:true,data:createres,message:"Successfully Added"})
            }
          
            // await session.commitTransaction();
    }
    catch(err){
        console.error('abort transaction',err);
        // await session.abortTransaction();
    }
    finally{
        // session.endSession()
    }


})
