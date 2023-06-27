const express=require('express')
const bcrypt = require('bcrypt');
const {add_career_details, get_career_all_data, delete_careerdetail } = require('../controllers/careerController');
const verifytokenrole = require('../../middleware/verifytokenrole');
const upload = require('../../utils/uploadImage');
const router=express.Router()

router.post('/add-career-details',upload.single('uploadcv'),add_career_details)
router.get('/get-all-career',verifytokenrole,get_career_all_data)
router.delete('/delete_career/:careerid',verifytokenrole,delete_careerdetail)
module.exports=router