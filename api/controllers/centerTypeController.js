const {CenterType, CenterTypeFeature,centerFeatureItem}=require('../models/centerType')

// parent start
exports.createCenterType=async(req, res)=>{
    const {name}=req.body;
    const data=await CenterType.create({name});
    res.status(200).json({
        status:"succesfully create",
        data:data
    })
}
exports.getCenterType=async (req, res) =>{
    const data=await CenterType.find()
    res.status(200).json({
        status:'succesfully create',
        data:data
    })
}
// parent end

// child start
exports.createCenterTypeFeature=async (req, res)=>{
    const {centerTypeId,name}=req.body;
    const data=await CenterTypeFeature.create({centerTypeId,name});
    res.status(200).json({
        status:'succesfully create',
        data:data
    })
}
exports.getCenterTypeFeature=async (req, res) =>{
    const data=await CenterTypeFeature.find()
    res.status(200).json({
        status:'succesfully create',
        data:data
    })
}
// child end

// grand child start
exports.createcenterFeatureItem=async (req, res)=>{
   const {centerTypeId,centerFeatureId,name}=req.body;
   const data=await centerFeatureItem.create({centerTypeId,centerFeatureId,name});
   res.status(200).json({
    status:'succesfully create',
    data:data
})
}
exports.getcenterFeatureItem=async (req, res) =>{
    const data=await centerFeatureItem.find()
    res.status(200).json({
        status:'succesfully create',
        data:data
    })
}
// grand child end