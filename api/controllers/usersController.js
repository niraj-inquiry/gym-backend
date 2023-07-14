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

// tocken generation

const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const ejs = require('ejs');
sgMail.setApiKey('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');
const generateVerificationToken = () => {
    const length = 32; // Length of the verification token
    return crypto.randomBytes(length).toString('hex');
  };
  



const nodemailer = require('nodemailer');

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
  } = req.body;

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

  // Generate verification token
  const verificationToken = crypto.randomBytes(20).toString('hex');
  
  // Update the user document with the verification token
  // Make sure you have a "verify_status" and "verificationToken" field in your Users schema
  data.verify_status = false;
  data.verificationToken = verificationToken;
  await data.save();
  console.log(verificationToken);
  // Create the verification link using the token and the frontend URL
  const verificationLink = `https://gym-frontend-mu.vercel.app/verify-user/${verificationToken}`;

  // Create a transporter object to send emails (e.g., using Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'niraj.inquiry@gmail.com',
      pass: 'ixydmpiujhzjrvdr',
    },
  });

  // Prepare the email content
  const mailOptions = {
    from: 'niraj.inquiry@gmail.com',
    to: email,
    subject: 'Account Verification',
    text: `Please click the following link to verify your account: ${verificationLink}`,
  };

  // Send the verification email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).json({
    status: 'okay',
    data: data,
  });
});

// Verification endpoint
exports.verifyUser = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params;
  
    // Find the user with the given verification token
    const user = await Users.findOne({ verificationToken });
    console.log(user);
    if (!user) {
      // Handle invalid or expired token
      return res.status(400).json({ error: 'Invalid verification token.' });
    }
  
    // Check if the received token matches the stored token
    if (req.params.verificationToken !== user.verificationToken) {
      // Handle token mismatch
      return res.status(400).json({ error: 'Verification token does not match.' });
    }
  
    // Update the user's verify_status to true
    user.verify_status = true;
    user.verificationToken = undefined; // Remove the token after verification
    await user.save();
  
    // Redirect to your frontend or send a response indicating successful verification
    // res.redirect('https://example.com/verification-success');
    res.status(200).json({ status: 'success' });
  });
  
  


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
