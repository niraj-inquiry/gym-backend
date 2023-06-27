const express=require('express')
const bcrypt = require('bcrypt');
const verifytokenrole = require('../../middleware/verifytokenrole');
const upload = require('../../utils/uploadImage');
const { refund_polices, get_all_policies, delete_policies } = require('../controllers/refundPoliciesController');
const router=express.Router()
router.delete('/delete-refund-policies/:delete_id',delete_policies)
router.post('/post-refund-polices',refund_polices)
router.get('/get-all-policies',get_all_policies)

module.exports=router