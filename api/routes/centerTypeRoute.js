const express=require('express')
const router=express.Router()
const {getcenterFeatureItem,
    createcenterFeatureItem,
    getCenterTypeFeature,
    createCenterTypeFeature,
    getCenterType,
    createCenterType
}=require('../controllers/centerTypeController')

router.post('/create-centertype',createCenterType)
router.get('/get-centertype',getCenterType)
router.post('/create-centertypefeature',createCenterTypeFeature)
router.get('/get-centertypefeature',getCenterTypeFeature)
router.post('/create-centerfeatureitem',createcenterFeatureItem)
router.get('/get-centerfeatureitem',getcenterFeatureItem)
module.exports=router;