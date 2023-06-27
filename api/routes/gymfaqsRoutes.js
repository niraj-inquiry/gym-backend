'use strict';
const express=require('express')
const router=express.Router()
const verifyToken = require('../../middleware/auth');
const { add_faqs, get_faqs_withoutgymcenterid, delete_faqs, update_faqs } = require('../controllers/gymfaqsControllers');


router.post('/add-faqs',verifyToken,add_faqs)
router.get('/get-faqs_withoutcenterid',get_faqs_withoutgymcenterid)
 router.put('/update-faqs',verifyToken,update_faqs)
router.delete("/delete-faq/:faqid",verifyToken,delete_faqs)
module.exports=router