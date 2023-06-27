const GymCenterDetails = require('../models/gymcenterdetails')
const GymCenters = require('../models/gymcenters')
const asyncHandler = require('../../middleware/async')
const Users = require('../models/users')
const { default: mongoose } = require('mongoose')
const { isEmpty } = require('../../generalfunction')



exports.add_gym_center_details = asyncHandler(async (req, res) => {

    try {
        const {
            gymcenterid,
            aboutus,
            gymeequipments,
            gymamenities,
            gymopenhours,
            gymfacilites,
            gymtrainer,
            created_by_userid } = req.body


        const findresgymid = await GymCenterDetails.find({ gymcenterid: gymcenterid })

        if (findresgymid.length > 0) {
            const gymcenterdeatils = await GymCenterDetails.updateMany({ gymcenterid: gymcenterid }, {
                $set: {
                    aboutus: aboutus,
                    gymeequipments: gymeequipments,
                    gymamenities: gymamenities,
                    gymopenhours: gymopenhours,
                    gymfacilites: gymfacilites,
                    gymtrainer: gymtrainer,
                    created_by_userid: created_by_userid,
                    created_date: Date.now()
                }
            })

            if (gymcenterdeatils.acknowledged === true && gymcenterdeatils.modifiedCount > 0) {
                res.status(200).send({ status: true, message: "Successfully updated" })
            }
            else {
                res.status(200).send({ status: true, message: "Already updated" })
            }
        }
        else {

            const gymcenterdeatils = await GymCenterDetails.create({
                gymcenterid: gymcenterid,
                aboutus: aboutus,
                gymeequipments: gymeequipments,
                gymamenities: gymamenities,
                gymopenhours: gymopenhours,
                gymfacilites: gymfacilites,
                gymtrainer: gymtrainer,
                created_by_userid: created_by_userid
            })
            // console.log("gymceeeeeeeee",gymcenterdeatils,req.body)
            res.status(200).send({ data: gymcenterdeatils, status: true, message: "Successfully added" })
        }
    }
    catch (err) {
        console.log("error", err)
        res.status(400).send({ message: "Something went wron", staus: false })
    }


})

exports.get_gym_center_all_details = asyncHandler(async (req, res) => {

    const { gymcenterid, email } = req.body
    console.log("gymcenterid", gymcenterid, req.body)
    console.log("userid", email)
    try {

        const userdata = await Users.findOne({ email: (email) })

        const gymcenter = await GymCenters.findOne({ $or: [{ email: (email) }, { _id: new mongoose.Types.ObjectId(gymcenterid) }] })

        if (!isEmpty(gymcenterid)) {
            const response = await GymCenterDetails.aggregate([
                {

                    $lookup: {
                        from: "users",
                        localField: "gymcenterid",
                        foreignField: "_id",
                        as: "userdata"
                    },

                    $lookup: {
                        from: "gymcenters",
                        localField: "gymcenterid",
                        foreignField: "_id",
                        as: "gymcenterinfo"
                    },

                },
                { $unwind: "$gymcenterinfo" },
                {
                    $lookup: {
                        from: "gymequipments",
                        localField: "gymeequipments.equipment_model_number",
                        foreignField: "equipment_model_number",
                        as: "gymeqeuipmentsinfo"
                    },

                },
                {
                    $lookup: {
                        from: "sporttrainers",
                        localField: "gymfacilites",
                        foreignField: "_id",
                        as: "gymfaciltiesinfo"
                    },

                },
                {
                    $lookup: {
                        from: "gymfaqs",
                        localField: "gymcenterid",
                        foreignField: "gymcenterid",
                        as: "gymfaqsinformation"
                    },

                },
                {
                    $match: { gymcenterid: new mongoose.Types.ObjectId(gymcenterid) }
                },
            ])
            console.log("response", response)
            if (response?.length > 0) {
                res.status(200).send({ data: response[0], response: response, status: true })
            }
            else {
                this.get_gym_center_all_details_by_user(req, res)
                // res.status(200).send({ data: gymcenter ,status: true })

            }

        }
        else {
            this.get_gym_center_all_details_by_user(req, res)
            // res.status(200).send({ data: gymcenter ,status: true })

        }
    }
    catch (err) {
        console.log("error", err)
        // res.status(200).send({ message: "Something went wrong", status: false })
    }
})


exports.get_gym_center_all_details_by_user = asyncHandler(async (req, res) => {
    const { email, gymcenterid } = req.body

    const userdata = await Users.findOne({ email: email })

    const gymcenter = await GymCenters.findOne({ $or: [{ email: (email) }, { _id: new mongoose.Types.ObjectId(gymcenterid) }] })



    const golresponse = await GymCenters.aggregate([
        {

            $lookup: {
                from: "users",
                localField: "email",
                foreignField: "email",
                as: "userdata"
            },

            $lookup: {
                from: "gymcenterdetails",
                localField: "_id",
                foreignField: "gymcenterid",
                as: "gymcenterinfo"
            },

        },
        //  { $unwind: "$gymcenterinfo" },
        {
            $lookup: {
                from: "gymequipments",
                localField: "gymeequipments.equipment_model_number",
                foreignField: "equipment_model_number",
                as: "gymeqeuipmentsinfo"
            },

        },
        {
            $lookup: {
                from: "sporttrainers",
                localField: "gymfacilites",
                foreignField: "_id",
                as: "gymfaciltiesinfo"
            },

        },
        {
            $lookup: {
                from: "gymfaqs",
                localField: "gymcenterid",
                foreignField: "gymcenterid",
                as: "gymfaqsinformation"
            },

        },
        {
            $match: { _id: new mongoose.Types.ObjectId(gymcenter?._id) }
        },
    ])

    if (userdata?.email === gymcenter?.email) {
        const response = await GymCenters.aggregate([
            {

                $lookup: {
                    from: "users",
                    localField: "email",
                    foreignField: "email",
                    as: "userdata"
                },

                $lookup: {
                    from: "gymcenterdetails",
                    localField: "_id",
                    foreignField: "gymcenterid",
                    as: "gymcenterinfo"
                },

            },
            //  { $unwind: "$gymcenterinfo" },
            {
                $lookup: {
                    from: "gymequipments",
                    localField: "gymeequipments.equipment_model_number",
                    foreignField: "equipment_model_number",
                    as: "gymeqeuipmentsinfo"
                },

            },
            {
                $lookup: {
                    from: "sporttrainers",
                    localField: "gymfacilites",
                    foreignField: "_id",
                    as: "gymfaciltiesinfo"
                },

            },
            {
                $lookup: {
                    from: "gymfaqs",
                    localField: "gymcenterid",
                    foreignField: "gymcenterid",
                    as: "gymfaqsinformation"
                },

            },
            {
                $match: { _id: new mongoose.Types.ObjectId(gymcenter?._id) }
            },
        ])

        if (response?.length > 0) {

            res.status(200).send({ data: response[response?.length - 1], response: response, status: true })
        }
        else {

            //    return({message:"No data", status: false })
            res.status(200).send({ message: "No data", status: false, data: golresponse })
        }

    }
    else {
        console.log('dddddddddddddd-', golresponse)
        res.status(200).send({ status: true, data: golresponse[0] })
    }
})





