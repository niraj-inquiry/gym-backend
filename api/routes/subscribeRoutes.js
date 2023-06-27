'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const verifyToken = require('../../middleware/auth');
const upload = require('../../utils/uploadImage');
const verifytokenrole = require('../../middleware/verifytokenrole');
const { add_subscribe, delete_all_subscribe } = require('../controllers/subscribeController');

router.get('/add-subscribe/:email',add_subscribe)
router.delete('/delete-all-subscribe',delete_all_subscribe)
module.exports=router