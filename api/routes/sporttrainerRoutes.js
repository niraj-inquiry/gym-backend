'use strict';
const express=require('express')
const router=express.Router()
const verifyToken = require('../../middleware/auth');
const upload = require('../../utils/uploadImage');
const { add_availablity_by_trainer, get_all_trainer_details, update_trainer_availability, delete_trainer_availability } = require('../controllers/sporttrainerControllers');

router.post('/add-availablity-by-trainer',add_availablity_by_trainer)
router.get('/get-all-trainer-details',get_all_trainer_details)
router.put('/update-trainer-availability',update_trainer_availability)
router.delete('/delete-trainer-availabilty',delete_trainer_availability)
module.exports=router