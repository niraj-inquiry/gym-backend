const mongoose =require('mongoose')

const AddMember=new mongoose.Schema({
    center_type:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
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
    address:{
     type:String
    },
    pin:{
        type:String
    },

    profile:{
        type:String
    },
    payment:{
        type:Boolean
    }
})

const VendorMember=mongoose.model("VendorMember", AddMember);
module.exports=VendorMember;