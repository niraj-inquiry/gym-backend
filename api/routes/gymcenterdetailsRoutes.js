'use strict';
const express=require('express')
const router=express.Router()
const verifyToken = require('../../middleware/auth');
const {add_gym_center_details, get_gym_center_all_details} =require('../controllers/gymcenterdetailsControllers');


router.post('/add-gym-center-details',add_gym_center_details)
router.post('/get-gym-center-all-details',get_gym_center_all_details)



module.exports=router