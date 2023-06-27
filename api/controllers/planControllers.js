const Plans = require('../models/plandetails')
const Users = require('../models/users')
const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { isEmpty } = require('../../generalfunction');


//getplan

exports.getplan = asyncHandler(async (req, res) => {
    const { country, vendorid } = req.params

    if (!isEmpty(country) && !isEmpty(vendorid)) {
        const planres = await Plans.find({ country: country, createdbyuserid: new mongoose.Types.ObjectId(vendorid) })
    
        if (planres?.length > 0) {
            res.status(200).send({ status: true, data: planres })
        }
        else{
            const resplan=await Plans.find({usertype:'admin'})
          if(resplan?.length>0){
            res.status(200).send({ status: true, data: resplan })
          }
          else{
            res.status(200).send({ status: false, data: planres })
          }
        }

    }
    else {
      
      this.get_vendor_all_plan()
    }
})

//delete plan

exports.delete_plan_by_id = asyncHandler(async (req, res) => {

    const deleteres = await Plans.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.planid) })
    if (deleteres.acknowledged === true && deleteres.deletedCount) {
        res.status(200).send({ status: true, message: "Successfully deleted" })
    }
    else {
        res.status(200).send({ status: true, message: "Already record deleted " })
    }
})

//get all plan

exports.get_all_plan = asyncHandler(async (req, res) => {
    try {
        const planres = await Plans.find({})
        if (planres.length > 0) {
            res.status(200).send({ status: true, data: planres })
        }
        else {
            res.status(200).send({ status: false, data: planres, message: "No data" })
        }
    }
    catch (err) {
        console.log("error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }
})

exports.get_plan_by_country = asyncHandler(async (req, res) => {
    try {


        const planresoncountry = await Plans.find({ country: { $regex: req.params.country, $options: 'is' }, activestatus: true })

        if (planresoncountry.length > 0) {
            res.status(200).send({ status: true, data: planresoncountry })
        }
        else {
            const planreson = await Plans.find({ activestatus: true, usertype: { $regex: 'admin', $options: 'is' } })
            if (planreson?.length > 0) {
                res.status(200).send({ status: true, data: planresoncountry, message: "No data" })
            }
            else {
                res.status(200).send({ status: false, data: planreson, message: "No data" })
            }
        }
    }
    catch (err) {
        console.log("error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }

})

exports.add_new_plan = asyncHandler(async (req, res) => {
    const {
        createdbyuserid,
        planname,
        aboutus,
        rate,
        discount,
        duration,
        country,
        passtype,
        usertype
    } = req.body
    console.log("addnew plan--------------", req.body)
    const planres = await Plans.find({ planname: planname, createdbyuserid: new mongoose.Types.ObjectId(createdbyuserid) })

    if (planres.length > 0) {
        const upresponse = await Plans.updateOne({ _id: new mongoose.Types.ObjectId(planres[0]._id) }, {
            $set: {
                createdbyuserid: createdbyuserid,
                planname: planname,
                aboutus: aboutus,
                rate: rate,
                discount: discount,
                duration: duration,
                country: country,
                passtype: passtype,
                usertype: usertype
            }
        })
        console.log("update", upresponse)
        if (upresponse.acknowledged === true && upresponse.modifiedCount) {
            res.status(200).send({ message: "Updated plan", status: true })
        }
        else {
            res.status(200).send({ message: "Already plan", status: true })
        }
        // res.status(200).send({message:"Already exist plan",status:false})
    }
    else {
        const createres = await Plans.create({
            createdbyuserid: createdbyuserid,
            planname: planname,
            aboutus: aboutus,
            rate: rate,
            discount: discount,
            duration: duration,
            passtype: passtype,
            country: country,
            usertype: usertype,
            photo: req?.file?.path?.replace("\\", "/")
        })
        res.status(200).send({ status: true, data: createres, message: "Successfully Added" })
    }

})


exports.update_plan_data = asyncHandler(async (req, res) => {
    const {
        plan_id,
        createdbyuserid,
        planname,
        aboutus,
        rate,
        discount,
        duration,
        country,
        passtype,
        usertype
    } = req.body

    const planres = await Plans.findOne({ planname: { $regex: planname, $options: 'is' }, createdbyuserid: new mongoose.Types.ObjectId(createdbyuserid) })
    const userdata = await Users.findOne({ _id: new mongoose.Types.ObjectId(createdbyuserid) })

    if (planres?.usertype === userdata.user_type) {
        const resplan = await Plans.updateMany({ _id: new mongoose.Types.ObjectId(plan_id) }, {
            $set: {
                createdbyuserid: createdbyuserid,
                planname: planname,
                aboutus: aboutus,
                rate: rate,
                discount: discount,
                duration: duration,
                passtype: passtype,
                country: country,
                photo: req?.file?.path?.replace("\\", "/"),
                usertype: usertype
            }
        })

        if (resplan.acknowledged === true && resplan.modifiedCount > 0) {
            res.status(200).send({ status: true, message: "Successfully updated" })
        }
        else {
            res.status(200).send({ status: false, message: "Already updated" })
        }
    }
    else {

        this.add_new_plan(req, res)

    }

})
exports.update_plan_data_by_Admin = asyncHandler(async (req, res) => {
    const {
        plan_id,
        createdbyuserid,
        planname,
        aboutus,
        rate,
        discount,
        duration,
        country,
        passtype,
        usertype
    } = req.body

    const planres = await Plans.find({ _id: new mongoose.Types.ObjectId(plan_id) })
    console.log("usertype", planres)
    const userdata = await Users.findOne({ _id: new mongoose.Types.ObjectId(createdbyuserid) })

    if (planres?.length > 0) {

        const resplan = await Plans.updateMany({ _id: new mongoose.Types.ObjectId(plan_id) }, {
            $set: {
                planname: planname,
                aboutus: aboutus,
                rate: rate,
                discount: discount,
                duration: duration,
                passtype: passtype,
                country: country,
                photo: req?.file?.path?.replace("\\", "/"),
                usertype: usertype
            }
        })

        if (resplan.acknowledged === true && resplan.modifiedCount > 0) {
            res.status(200).send({ status: true, message: "Successfully updated" })
        }
        else {
            res.status(200).send({ status: false, message: "Already updated" })
        }
    }


})

exports.get_vendor_plan = asyncHandler(async (req, res) => {
    try {
        var planresoncountry = await Plans.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "createdbyuserid",
                    foreignField: "_id",
                    as: "userinfo"
                },
            },
            {
                $match: {
                    $or: [{
                        $and: [
                            { "userinfo.user_type": "admin" },
                            { country: { $regex: req?.params?.country, $options: 'is' } }
                        ]
                    },
                        //  {createdbyuserid:new mongoose.Types.ObjectId(req?.params?.user_id)}
                    ]
                }
            },
            {
                $project: {
                    userinfo: 0
                }
            }
        ]);

        var plansgetdefault = await Plans.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "createdbyuserid",
                    foreignField: "_id",
                    as: "userinfo"
                },
            },
            {
                $match: {
                    $or: [{
                        $and: [
                            { "userinfo.user_type": "admin" }
                        ]
                    },
                        // {createdbyuserid:new mongoose.Types.ObjectId(req?.params?.user_id)}
                    ]
                }
            },
            {
                $project: {
                    userinfo: 0
                }
            }
        ])



        if (planresoncountry.length > 0) {
            res.status(200).send({ status: true, data: planresoncountry })
        }
        else {
            if (plansgetdefault?.length > 0) {
                res.status(200).send({ status: true, data: plansgetdefault })
            }
            else {
                res.status(200).send({ status: false, data: planresoncountry, message: "No data" })
            }
        }
    }
    catch (err) {
        console.log("error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }

})

exports.get_vendor_all_plan = asyncHandler(async (req, res) => {
    try {

        var planreson = await Plans.find({ createdbyuserid: req.params.user_id })

        if (planreson.length > 0) {
            res.status(200).send({ status: true, data: planreson })
        }
        else {

            res.status(200).send({ status: false, data: planresons, message: "No data" })

        }
    }
    catch (err) {
        console.log("error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }

})