'use strict';
const express=require('express')
const router=express.Router()
const verifyToken = require('../../middleware/auth');
const {add_gym_equipments,delete_gym_equipments, update_gym_equipments, get_all_gym_equipments} =require('../controllers/gymequipmentsControllers')
const upload =require('../../utils/uploadImage');

router.post('/add-gym-equipments',upload.single('equipments'),add_gym_equipments)
router.delete('/delete-gym-equipment',delete_gym_equipments)
router.put('/update-gym-equipment',upload.single('equipments'),update_gym_equipments)
router.get("/get-all-gym-equipments",get_all_gym_equipments)
module.exports=router