const express=require('express')
const router=express.Router()
const {createOrder,update_order_by_id,get_order,get_order_by_id}=require('../controllers/orderreviewController')

router.post('/create-order', createOrder)
router.patch('/update-order/:id', update_order_by_id)
router.get('/get-order',get_order)
router.get('/get-order/:id',get_order_by_id)


module.exports=router