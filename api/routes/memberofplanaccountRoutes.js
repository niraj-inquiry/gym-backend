'use strict';
const express=require('express')
const router=express.Router()
const verifyToken = require('../../middleware/auth');
const { add_member_plan, get_member_details, get_vendor_details, get_all_details } = require('../controllers/memberofplanaccountControllers');

router.get('/get-all-memberofplan',get_all_details)
router.get('/get-vendor-details/:selectvendorid',get_vendor_details)
router.get('/get-member-details/:userid',get_member_details)
router.post('/add-member-plan',add_member_plan)
module.exports=router