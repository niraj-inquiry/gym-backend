const mongoose=require('mongoose')

const centerTypeSchema=new mongoose.Schema({
    name:{
        type:String
    }
})
const CenterType=mongoose.model('CenterType',centerTypeSchema)
const centerFeature=new mongoose.Schema({
    centerTypeId:{
        type:String
    },
    name:{
     type:String
    }
})
const CenterTypeFeature=mongoose.model('CenterTypeFeature',centerFeature)

const centerTypeFeatureItem=new mongoose.Schema({
    centerTypeId:{
        type:String
    },
    centerFeatureId:{
        type:String
       },
    name:{
        type:String
    }

})
const centerFeatureItem=mongoose.model('centerFeatureItem',centerTypeFeatureItem)
module.exports={CenterType, CenterTypeFeature,centerFeatureItem}