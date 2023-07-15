const express=require('express')
const router=express.Router()
const {createOrder,update_order_by_id}=require('../controllers/orderreviewController')

router.post('/create-order', createOrder)
router.patch('/update-order', update_order_by_id)

module.exports=router