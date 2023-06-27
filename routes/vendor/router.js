const express = require("express");
const router = express.Router();
const GymList=require('../../model/vendor/CreateGym')
const VendorMember=require('../../model/vendor/AddMember')
const bodyParser = require("body-parser");
router.use(bodyParser.json());


// Center start

router.post('/create-gym-center', async (req, res)=>{
   try {
    const {profile,  pin, city, state, country, pan,gst,phone,email, center_name,center_type}=req.body;
    console.log(country);
    const data=await GymList.create({profile,  pin, city, state, country, pan,gst,phone,email, center_name,center_type});
   
   res.status(200).json({
    status:"Gym Cernter is created",
    data:data
   })
   } catch (error) {
     console.log(error);
   }
})

router.get('/get-gym-center', async(req, res)=>{
   try {
     const data=await GymList.find();
     res.status(200).json({
      status:"All Gym List",
      data:data
     })
   } catch (error) {
    console.log(error);
   }
} )

router.get("/get-gym-center/:id", async (req, res)=>{
  try {
    const { id } = req.params;
    const data=await GymList.findById({_id:id});
    res.status(200).json({
      status:"Gym Center got by id",
      data:data
    })
  } catch (error) {
    console.log(error);
  }
})
router.patch("/update-gym-center/:id", async (req, res)=>{
  try {
    const { id } = req.params;
    const data=await GymList.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status:"Gym Center updated",
      data:data
    })
  } catch (error) {
    console.log(error);
  }
})
router.delete("/delete-gym-center/:id", async (req, res)=>{
  try {
    const { id } = req.params;
    const data=await GymList.findByIdAndDelete({_id:id});
    res.status(200).json({
      status:"Gym Center delete",
      data:data
    })
  } catch (error) { 
    console.log(error);
  }
})
// Center end

// Member start
router.post('/create-member', async (req, res)=>{
  try {
   const {profile,  pin, city, state, country,phone,email, address, name,center_type}=req.body;
   console.log(country);
   const data=await VendorMember.create({profile,  pin, city, state, address, country,phone,email, name,center_type});
  
  res.status(200).json({
   status:"Gym Cernter is created",
   data:data
  })
  } catch (error) {
    console.log(error);
  }
})

router.get('/get-member', async(req, res)=>{
  try {
    const data=await VendorMember.find();
    res.status(200).json({
     status:"All Gym List",
     data:data
    })
  } catch (error) {
   console.log(error);
  }
} )

router.get("/get-member/:id", async (req, res)=>{
 try {
   const { id } = req.params;
   const data=await VendorMember.findById({_id:id});
   res.status(200).json({
     status:"Gym Center got by id",
     data:data
   })
 } catch (error) {
   console.log(error);
 }
})
router.patch("/update-member/:id", async (req, res)=>{
 try {
   const { id } = req.params;
   const data=await VendorMember.findOneAndUpdate(id, req.body, {
     new: true,
   });
   res.status(200).json({
     status:"Gym Center updated",
     data:data
   })
 } catch (error) {
   console.log(error);
 }
})
router.delete("/delete-member/:id", async (req, res)=>{
 try {
   const { id } = req.params;
   const data=await VendorMember.findByIdAndDelete({_id:id});
   res.status(200).json({
     status:"Gym Center delete",
     data:data
   })
 } catch (error) { 
   console.log(error);
 }
})
// Member end

module.exports = router;