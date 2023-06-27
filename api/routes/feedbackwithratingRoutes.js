'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const {add_feedbackwithrating, get_all_feedbackwithrating, get_feedbackby_centerid, delete_Allfeedback, delete_feedback_feedid}=require('../controllers/feedbackWithRatingController');
const verifyToken = require('../../middleware/auth');
const upload = require('../../utils/uploadImage');
const verifytokenrole = require('../../middleware/verifytokenrole');

router.post('/add-new-feedbackwithrating',add_feedbackwithrating)
router.get('/get-all-feedback',get_all_feedbackwithrating)
router.get('/get-all-feedback_centerid/:centerid',get_feedbackby_centerid)
router.delete('/delete_all_feedback',delete_Allfeedback)
router.delete('/delete_data/:feedid',delete_feedback_feedid)
module.exports=router