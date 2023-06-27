const MemberOfPlanAccount = require("../models/memberofplanaccount")
const RefundPlan = require("../models/refundPlan")
const Plan=require("../models/plandetails")
const moment=require('moment')

exports.refunding=async()=>{
   
  const memberofplan=await  MemberOfPlanAccount.find({})
//   console.log("member of plan",memberofplan[memberofplan.length-1])
  const planend=await Plan.findOne({_id:memberofplan[memberofplan.length-1].selectplanid})
 console.log("refunpolices",memberofplan[memberofplan.length-1].created_date)
 switch (planend.duration) {
    case "month":
        
        break;
 
    default:
        break;
 }
//   let allFounded = refunpolices.every( ai => memberofplan.includes(ai.selectplanid) );
//   console.log("refund of plan",allFounded)
  let plandata=await Plan.find({})
//   console.log("plandata",plandata[0])
 
}