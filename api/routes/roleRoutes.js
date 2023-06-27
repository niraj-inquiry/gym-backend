'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const {addRole,deleterolename,updaterolename,getAllRole,getroll}=require('../controllers/roleController');
// const verifyToken = require('../../middleware/auth');
const upload = require('../../utils/uploadImage');
// const verifytokenrole = require('../../middleware/verifytokenrole');

router.post('/add-role', addRole)
router.put('/update-role',updaterolename)
router.get('/get-all-role',getAllRole)
router.delete('/delete-role/:roleid',deleterolename)
router.get('/get-role',getroll)
module.exports=router