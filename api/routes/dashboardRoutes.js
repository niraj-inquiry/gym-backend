const express=require('express')
const bcrypt = require('bcrypt');

const verifytokenrole = require('../../middleware/verifytokenrole');
const upload = require('../../utils/uploadImage');
const { get_all_data ,getCenterdetail} = require('../controllers/dashboardController');
const router=express.Router()

router.get('/get-all-data',get_all_data)
router.get('/get-search-data/:searchtext',getCenterdetail)
module.exports=router