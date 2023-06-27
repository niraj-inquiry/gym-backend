const Subscribe = require('../models/subscribe')

const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const { generateRandom, isEmpty } = require('../../generalfunction');
require('dotenv').config

exports.add_subscribe = asyncHandler(async (req, res) => {

    try {
        const email = req.params.email
        const subscribelist = await Subscribe.find({ email: email })
        if (isEmpty(email)) {
          if (subscribelist?.length > 0) {
                res.status(200).send({ status: false, data: subscribelist, message: "Subscribe already exist" })
            }
            else {
                const user = await Subscribe.create({ email: email })

                res.status(200).send({ status: true, data: user, message: "Successfully Add" })
            }
        }
        else {
            res.status(200).send({ status: false, data: user, message: "Please Enter Proper Email id" })
        }
    }
    catch (err) {
        console.log("error", err)
    }
})


exports.delete_all_subscribe = asyncHandler(async (req, res) => {

    try {

        const subscribelist = await Subscribe.deleteMany()

        if (subscribelist?.acknowledged === true && subscribelist.deletedCount > 0) {
            res.status(200).send({ status: true, data: subscribelist, message: "Successfully Deleted" })
        }
        else {
            res.status(200).send({ status: false, message: "Already data deleted" })
        }
    }
    catch (err) {
        console.log("error", err)
    }
})