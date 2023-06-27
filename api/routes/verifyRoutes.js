'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const userController=require('../controllers/usersController');
const verifyToken = require('../../middleware/auth');

const upload = require('../../utils/uploadImage');
const { get_gym_data,verify_vendor_by_admin, unverified_vendor_by_admin } = require('../controllers/verifyController');


router.put('/verify-by-admin/:gymcenter_id',verify_vendor_by_admin)
router.put('/unverify-by-admin/:gymcenter_id',unverified_vendor_by_admin)
router.get('/get-vendor',get_gym_data)
module.exports=router