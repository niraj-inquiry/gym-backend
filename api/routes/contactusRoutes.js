'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const { get_all_contact, add_contact, delete_contactus } = require('../controllers/contactusController');
const verifytokenrole = require('../../middleware/verifytokenrole');
const router=express.Router()

router.post('/add-contact',add_contact)
router.get('/get-all-contact',verifytokenrole,get_all_contact)
router.delete('/delete_contactus/:contactid',verifytokenrole,delete_contactus)
module.exports=router