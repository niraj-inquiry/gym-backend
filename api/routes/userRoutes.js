'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const {update_userprofile,delete_users_details, get_userdata_byid,register, login,get_all_user,forget_password}=require('../controllers/usersController');
const verifyToken = require('../../middleware/auth');

const upload = require('../../utils/uploadImage');



router.get('/getdata',(req,res)=>{
    res.status(200).send("dddd")
})
router.get('/get-all-users',get_all_user)
router.post('/register',upload.single('image'),register)
router.post('/login',userController.login)
router.get("/get-data-by-userid/:user_id",get_userdata_byid)
router.delete('/delete-user-details/:user_id',delete_users_details)
// router.put('/user-verify-by-admin',userController.verify_vendor_by_admin)
router.put('/update-user',upload.single('image'),update_userprofile)
router.post('/forget-password',forget_password)
module.exports=router
