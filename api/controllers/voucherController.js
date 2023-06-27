const Voucher = require('../models/voucher')
const GymCenters = require('../models/gymcenters')
const GymCenterDetails = require('../models/gymcenterdetails')
const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const {  generateRandom } = require('../../generalfunction');
require('dotenv').config

exports.add_voucher = asyncHandler(async (req, res) => {
    try {
        const { 
            voucharname,
            duration,
           durationunit,
           discount ,
           description
        } = req.body
let ramdom=generateRandom(9)
const voucherlist=await Voucher.find({voucharcode:ramdom})
if(voucherlist?.list>0){
    res.status(200).send({ status: false, data: user, message: "Voucher code already exist" })
}
else{
 const user = await Voucher.create({
    voucharname,
     voucharcode:ramdom,
    duration,
    durationunit,
    discount,
    description
})

  res.status(200).send({ status: true, data: user, message: "Successfully Add" })
} 
    }
    catch (err) {
        console.log("error", err)
    }
})

// exports.update_voucher=asyncHandler(async(req,res)=>{
//     const voucherid=req.params.voucherid

// })


exports.get_all_voucher_info = asyncHandler(async (req, res) => {
    const voucherinfo = await Voucher.find()
    if (voucherinfo?.length > 0) {
        res.status(200).send({ status: true, data: voucherinfo })
    }
    else {
        res.status(200).send({ status: false, data: voucherinfo })
    }
})

exports.delete_voucher_info = asyncHandler(async (req, res) => {
    const voucherid = req.params.voucherid
    const deleteres = await Voucher.deleteOne({ _id: new mongoose.Types.ObjectId(voucherid) })
    if (deleteres.acknowledged == true && deleteres?.deletedCount > 0) {
        res.status(200).send({ status: true, message: "Successfully Deleted" })
    }
    else {
        res.status(200).send({ status: false, message: "Unsuccessfully Deleted" })
    }
})

exports.get_voucher_by_code=asyncHandler(async(req,res)=>{
    const vouchercode=req.params.vouchercode
   
    const findres = await Voucher.find({ voucharcode: vouchercode})
    if (findres?.length>0) {
        res.status(200).send({ status: true, data:findres})
    }
    else {
        res.status(200).send({ status: false,data:findres ,message: "No Data" })
    }
})