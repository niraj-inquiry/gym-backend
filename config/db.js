const mongoose =require('mongoose')

const connectDB=async()=>{
    const connection= await mongoose.connect("mongodb+srv://testing:root@testing.hj77rpl.mongodb.net/gym",{
        useNewUrlParser: true,
          useUnifiedTopology: true
    })
    console.log("Database Connected")
}

module.exports=connectDB