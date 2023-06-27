const SportTrainer = require('../models/sporttrainer')
const Users=require('../models/users')
const asyncHandler = require('../../middleware/async')
const mongoose = require('mongoose')
const GymCenterDetails = require('../models/gymcenterdetails')

exports.add_availablity_by_trainer = (asyncHandler(async (req, res) => {
  try{
    const { user_id,gym_id ,avalibility } = req.body
   
    if(user_id || gym_id){
        const usersres=await SportTrainer.find({
            user_id:new mongoose.Types.ObjectId(user_id),
            gym_id:new mongoose.Types.ObjectId(gym_id)
        })

        if(usersres.length===0){
                  const trainerres=await SportTrainer.create({
                    user_id,gym_id ,avalibility
                  })

            //   console.log("trainers",trainerres)
            //   todo add array data
              if(trainerres?.avalibility.length>0){
                const gymcenter=await GymCenterDetails.updateMany({
                    gymcenterid:new mongoose.Types.ObjectId(gym_id)},
                    {$push:{gymfacilites:trainerres._id}}
                    )

                    // console.log("update gymcenter details",gymcenter)
                res.status(200).send({message:"Successfully add data",data:trainerres,status:true})
              }
              else{
                res.status(200).send({
                    message:"Please Add trainer availablity",
                    status:false
                })
              }
        }
        else{
            res.status(200).send({message:"Already data exist",status:false})
        }
    }
  }
  catch(err){
    console.log("error",err)
    res.status(200).send({ status: false, message: "Something went wrong" })
  }

   
}))

exports.get_all_trainer_details = asyncHandler(async (req, res) => {
    try {
        const responsedata = await Users.aggregate([
            {
                $lookup: {
                    from: "sporttrainers",       // other table name
                    localField: "_id",   // name of users table field
                    foreignField: "user_id", // name of userinfo table field
                    as: "user_info"         // alias for userinfo table
                }
            },
            { $unwind: "$user_info" },
          
            {
                $project: {
                    _id: 1,
                    avalibility: "$user_info.avalibility",
                    user_type:1,
                    first_name:1,
                    gender:1,
                    description:1,
                    email:1,
                    last_name:1,
                    photo:1

                }
            }
        ])

        if (responsedata.length > 0) {
            res.status(200).send({data: responsedata, status: true })
        }
        else{
            res.status(200).send({status:false,message:"No data"})
        }
    }
    catch (err) {
        console.log("Error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }
})

exports.update_trainer_availability=asyncHandler(async(req,res)=>{
    try{
        const { user_id,gym_id ,avalibility } = req.body
        if(user_id  && gym_id){
            const updateres = await SportTrainer.updateOne({ 
                user_id: new mongoose.Types.ObjectId(user_id),
                gym_id:new mongoose.Types.ObjectId(gym_id)
            }, {
            $set: {
                avalibility: avalibility,
             
            }
        })
            let data = await SportTrainer.find({ user_id: new mongoose.Types.ObjectId(user_id) }, { avalibility: 1, _id: 0 })

        if (updateres.modifiedCount > 0) {
            res.status(200).send({ status: true, message: "Sucessfully updated data", data: data[0] })
        } else {
            res.status(200).send({ status: false, message: "does not avaliable data" })

        }
        }
        else{
            res.status(200).send({status:false,message:"Please Enter userId and gymid"})
        }
  
     
    }
    catch(err){
        console.log("Error",err)
        res.status(200).send({status:false,message:"Something went wron"})
    }
       
})

exports.delete_trainer_availability=asyncHandler(async(req,res)=>{
    try{
        const { user_id,gym_id  } = req.body
        if(user_id  || gym_id){
            const deleteres=await SportTrainer.deleteMany({
                user_id:new mongoose.Types.ObjectId(user_id),
                gym_id :new mongoose.Types.ObjectId(gym_id)})
                console.log("delete response",deleteres)
                if(deleteres.acknowledged===true && deleteres.deletedCount>0){
                    res.status(200).send({status:true,message:"Successfully deleted data"})
                }
                else{
                    res.status(200).send({status:false,message:"No Data available"})
                }
        }
        else{
            res.status(200).send({status:false,message:"Please Enter userId and gymid"})
        }
    }
    catch(err){
        console.log("Error",err)
    }
})

