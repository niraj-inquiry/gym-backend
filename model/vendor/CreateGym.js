const mongoose =require('mongoose')

const CreateGymSchema=new mongoose.Schema({
    center_type:{
        type:String
    },
    center_name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    gst:{
        type:String
    },
    pan:{
        type:String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    pin:{
        type:String
    },
   

    profile:{
        type:String
    },
})

const GymList=mongoose.model("GymList", CreateGymSchema);
module.exports=GymList;