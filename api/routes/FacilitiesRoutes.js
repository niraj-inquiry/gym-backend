const express=require('express')
const { add_facilities, get_All_facilities, update_facilities, delete_facilities } = require('../controllers/FacilitiesController');
const router=express.Router()


router.post('/add-facilities',add_facilities)
router.get('/get-all-facilities',get_All_facilities)
router.put('/update-facilties',update_facilities)
router.delete('/delete-facilties/:facilities_id',delete_facilities) 

module.exports=router