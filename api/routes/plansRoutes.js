'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const upload = require('../../utils/uploadImage');
const verifyToken = require('../../middleware/auth');
const { add_new_plan, get_plan_by_country, get_all_plan, delete_plan_by_id, update_plan_data, get_vendor_plan, get_vendor_all_plan, getplan, update_plan_data_by_Admin } = require('../controllers/planControllers');
const verifytokenrole = require('../../middleware/verifytokenrole');
       router.post('/add-New-plan',
        upload.single('image'),
        add_new_plan)
        router.put('/update-plan',upload.single('image'),update_plan_data)
        router.put('/update_plan-by-admin',upload.single('image'),update_plan_data_by_Admin)
      // get_plan_by_country
        router.get('/get-plan-by-country/:country',get_plan_by_country)
        router.get('/get-all-plan',get_all_plan)
        router.delete('/delete-plan-by-id/:planid',verifytokenrole,delete_plan_by_id)
        router.get('/get-vendor-plan/:country/:user_id',get_vendor_plan)
        router.get('/get-vendor-all-plan-by-user/:user_id',get_vendor_all_plan)
        router.get('/get-plan/:country/:vendorid',getplan)
module.exports=router