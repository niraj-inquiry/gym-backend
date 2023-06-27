const TeamInfo = require('../models/TeamInfo')
const GymCenters = require('../models/gymcenters')
const GymCenterDetails = require('../models/gymcenterdetails')
const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
require('dotenv').config
const {isEmpty}=require('../../generalfunction')
exports.add_team = asyncHandler(async (req, res) => {
    try {
        const { first_name,
            last_name,
            email,
            address,
            pincode,
            occupation,
            gender,
            description,
            country,
            state,
            district } = req.body
           if(!isEmpty(email)){
            const allTeam = await TeamInfo.find({ email: email })

            if (allTeam.length >0) {
           const userdata=await TeamInfo.updateOne(
            {_id:new mongoose.Types.ObjectId(allTeam[0]?._id)},
              {$set:{
                first_name:first_name??first_name,
                    last_name:last_name??last_name,
                    email:email??email,
                    address:address??address,
                    pincode:pincode??pincode,
                    occupation:occupation??occupation,
                    gender:gender??gender,
                    description:description??description,
                    country:country??country,
                    state:state??state,
                    district:district??district,
                    photo:req?.file?.path?.replace("\\", "/")
                }}
                )
                if(userdata.acknowledged===true &&userdata?.modifiedCount>0){
                    res.status(200).send({ status: true, data: userdata, message: "Successfully Updated" })
                }
                else{
                    res.status(200).send({ status: false, data: userdata, message: "Already updated" })
      
                }
                
            }
            else {
                const user = await TeamInfo.create({
                    first_name:first_name,
                    last_name:last_name,
                    email:email,
                    address:address,
                    pincode:pincode,
                    occupation:occupation,
                    gender:gender,
                    description:description,
                    country:country,
                    state:state,
                    district:district,
    photo: req?.file?.path?.replace("\\", "/")
                })
                    
    
                res.status(200).send({ status: true, data: user, message: "Successfully Add" })
            }
           }
           else{
            res.status(200).send({ status: false,  message: "Please Enter Proper email id" })

           }

      
    }
    catch (err) {
        console.log("error", err)
    }
})


exports.get_all_team_info = asyncHandler(async (req, res) => {
    const allteaminfo = await TeamInfo.find()
    if (allteaminfo?.length > 0) {
        res.status(200).send({ status: true, data: allteaminfo })
    }
    else {
        res.status(200).send({ status: false, data: allteaminfo })
    }
})

exports.delete_team_info = asyncHandler(async (req, res) => {
    const teamid = req.params.teamid
    const deleteres = await TeamInfo.deleteOne({ _id: new mongoose.Types.ObjectId(teamid) })
    if (deleteres.acknowledged == true && deleteres?.deletedCount > 0) {
        res.status(200).send({ status: true, message: "Successfully Deleted" })
    }
    else {
        res.status(200).send({ status: false, message: "Unsuccessfully Deleted" })
    }
})