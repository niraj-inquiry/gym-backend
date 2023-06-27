'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const upload = require('../../utils/uploadImage');
const verifyToken = require('../../middleware/auth');
const verifytokenrole = require('../../middleware/verifytokenrole');
const { add_review_order, get_review_order, delete_all_record, delete_review_record_by_id, get_all_review_order } = require('../controllers/ReviewOrderController');
      
router.get('/get-all-review',get_all_review_order)
router.post('/add-review-order',add_review_order)
router.get('/get-review-order/:user_id',get_review_order)
router.delete('/delete-all-review-order',delete_all_record)
router.delete("/delete-review-record-by-id/:userid/:selectvendorid/:selectplanid",delete_review_record_by_id)
module.exports=router