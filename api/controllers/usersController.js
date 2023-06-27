const Users = require('../models/users')
const GymCenters = require('../models/gymcenters')
const GymCenterDetails = require('../models/gymcenterdetails')
const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { default: mongoose } = require('mongoose');
const { isEmpty } = require('../../generalfunction');

require('dotenv').config



exports.forget_password = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!isEmpty(email)) {
        const userdata = await Users.find({ email: email })

        if (userdata.length > 0) {
            const userDetails = await Users.findOne({ email: email })

            let encryptedPassword = bcrypt.hashSync(password, 10)
            bcrypt.compare(password, userDetails.password, async (err, result) => {

                if (result == true) {
                    res.status(200).send({ status: false, message: "Old Password" })
                }
                else {
                    const upres = await Users.updateOne({ _id: userDetails?._id }, {
                        $set: {
                            password: encryptedPassword
                        }
                    })

                    if (upres?.acknowledged === true && upres?.modifiedCount > 0) {
                        const token = jwt.sign({ id: userDetails?._id }, "secretkey", { expiresIn: '1d' })

                        res.status(200).send({ token: token, status: true, message: "Successfully Updated", userDetails })
                    }
                }
            })
        }
        else {
            res.status(200).send({ status: false, message: "Email Id does not exist" })

        }

    }
})
exports.get_all_user = asyncHandler(async (req, res) => {
    try {
        const allUser = await Users.find({ user_type: { $nin: ["super", "admin"] } })
        if (allUser.length > 0) {
            res.status(200).send({ status: true, data: allUser })
        }
        else {
            res.status(200).send({ status: false, data: "No data available" })
        }
    }
    catch (err) {
        console.log("error", err)
    }
})

exports.login = (async (req, res) => {
    const { email, password } = req.body
    
    const data=await Users.findOne({ email, password });
    res.status(200).json({
        status:'okay',
        data:data
    })

  

})

  
exports.register = asyncHandler(async (req, res) => {

    const {
        first_name,
        last_name,
        email,
        password,
        post_code,
        description,
        user_type,
        gender,

    } = req.body

    // let encryptedPassword = bcrypt.hashSync(password, 10)

    // console.log("userregister", req.body)
    const data = await Users.create({
        first_name,
        last_name,
        email,
        password,
        post_code,
        description,
        user_type,
        gender,
    });
    res.status(200).json({
        status: "okay",
        data: data
    })
    // if (email) {
    //     const userDetail = await Users.find({ email: email })
    //     console.log("ddddddddddd", userDetail)
    //     if (userDetail.length === 0) {
    //         const user = await Users.create({
    //             first_name,
    //             last_name,
    //             email,
    //             password: encryptedPassword,
    //             post_code,
    //             description,
    //             user_type,
    //             gender,
    //             photo: req?.file?.path?.replace("\\", "/")
    //         })


    //         const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: '1d' })

    //         res.status(200).send({ status: true, message: "Registration Successful", data: user, token: token })
    //     }
    //     else {
    //         res.status(200).send({ status: false, message: "User Already Exists" })
    //     }
    // }
    // else {
    //     res.status(200).send({ status: false, message: "Registration unsuccessful" })
    // }

})

exports.get_userdata_byid = asyncHandler(async (req, res) => {
    try {
        const resdata = await Users.findOne({ _id: new mongoose.Types.ObjectId(req.params.user_id) })

        res.status(200).send({ status: true, data: resdata })
    }
    catch (err) {
        console.log("error", err)
        res.status(200).send({ message: "Something went wrong", status: false })
    }
})

exports.delete_users_details = asyncHandler(async (req, res) => {
    try {

        const deletedata = await Users.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.user_id) })

        if (deletedata.acknowledged === true && deletedata.deletedCount === 1) {

            res.status(200).send({ status: true, message: "Deleted Record Successfully" })
        }
        else {
            res.status(200).send({ status: false, message: "Invalid record" })
        }
    }
    catch (err) {
        console.log("Error", err)
        res.status(200).send({ message: "Something went wrong", status: false })
    }
})


exports.update_userprofile = asyncHandler(async (req, res) => {

    const {
        first_name,
        last_name,
        email,
        password,
        post_code,
        description,
        user_type,
        gender,
        user_id,
        dob,
        contactnumber,
        workpostcode,
        homepostcode
    } = req.body

    //   let encryptedPassword=bcrypt.hashSync(password,10)

    let userdata = await Users.findOne({ _id: user_id })

    if (!isEmpty(email)) {

        // if(userDetail.length>0){
        const user = await Users.updateOne({ _id: new mongoose.Types.ObjectId(user_id) }, {
            $set: {
                first_name: first_name ?? first_name,
                last_name: last_name ?? last_name,
                email: email ?? email,
                post_code: post_code ?? post_code,
                description: description ?? description,
                user_type: user_type ?? user_type,
                gender: gender ?? gender,

                dob: dob ?? dob,
                contactnumber: contactnumber ?? contactnumber,
                workpostcode: workpostcode ?? workpostcode,
                homepostcode: homepostcode ?? homepostcode,
                photo: req?.file?.path?.replace("\\", "/")
            }
        })
        const userDetail = await Users.findOne({ _id: new mongoose.Types.ObjectId(user_id) })

        res.status(200).send({ status: true, message: "Updated Successfully", userDetail })
    }
    else {
        res.status(200).send({ status: false, message: "Please Enter Proper Email Id" })
    }
})