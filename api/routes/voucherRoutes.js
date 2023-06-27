'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const {add_voucher,get_all_voucher_info, delete_voucher_info, get_voucher_by_code}=require('../controllers/voucherController');
const verifyToken = require('../../middleware/auth');
const upload = require('../../utils/uploadImage');
const verifytokenrole = require('../../middleware/verifytokenrole');

router.post('/add-new-voucher',add_voucher)
router.get('/get-all-voucher',get_all_voucher_info)
router.delete('/delete-voucher/:voucherid',delete_voucher_info)
router.get('/voucher-info/:vouchercode',get_voucher_by_code)
module.exports=router