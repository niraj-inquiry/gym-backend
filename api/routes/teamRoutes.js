'use strict';
const express=require('express')
const bcrypt = require('bcrypt');
const router=express.Router()
const {add_team, get_all_team_info, delete_team_info}=require('../controllers/teamInfoController');
const verifyToken = require('../../middleware/auth');
const upload = require('../../utils/uploadImage');
const verifytokenrole = require('../../middleware/verifytokenrole');

router.post('/add-new-team-member',upload.single('image'),add_team)
router.get('/get-all-team-info',get_all_team_info)
router.delete('/delete-team-info/:teamid',delete_team_info)
module.exports=router