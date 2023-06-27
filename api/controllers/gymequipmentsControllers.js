const GymEquipments = require('../models/gymequipments')
const asyncHandler = require('../../middleware/async')
const mongo = require('mongodb')
const { isEmpty } = require('../../generalfunction')
exports.add_gym_equipments = asyncHandler(async (req, res) => {
    try {
        const {
            user_id,
            gymid,
            equipment_name,
            equipment_brand,
            equipment_model_number,
            description,
            
        } = req.body
       
        if (!isEmpty(equipment_model_number)) {
            const equidata = await GymEquipments.find({equipment_model_number: equipment_model_number,gymid:gymid})
         
            if (equidata?.length > 0) {
               
                    const resupdata=  await GymEquipments.updateOne({
                           _id:new mongo.ObjectId(equidata[0]?._id),
                            equipment_model_number:equipment_model_number
                        },{
                            $set:{
                                 
                                description:description,
                                equipment_name:equipment_name,
                                equipment_brand:equipment_brand,
                                equipment_model_number:equipment_model_number,
                                equipment_image: req?.file?.path?.replaceAll("\\", "/"),
                            }
                        })
                        console.log("resupdata",resupdata)
                        if(resupdata.modifiedCount>0){
                            res.status(200).send({ status: true, message: "Successfully updated data" })
                        }
                        else{
                            res.status(200).send({ status: true, message: "No data updated" })
                        }
    
            }
            else {
               
                const equiadddata = await GymEquipments.create({
                    gymid:gymid,
                    user_id:user_id,
                    description:description,
                    equipment_name: equipment_name,
                    equipment_brand: equipment_brand,
                    equipment_image: req?.file?.path.replaceAll("\\", "/"),
                    equipment_model_number: equipment_model_number
                })

                res.status(200).send({ data: equiadddata, message: "Successfully add equipement", status: true })
            
            }
        }
        else {
            res.status(200).send({ message: "Please enter equipment model number", status: false })
        }
    }
    catch (err) {
        console.log("Error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }

})

exports.delete_gym_equipments = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.body
        const deleteres = await GymEquipments.deleteOne({ _id: new mongo.ObjectId(_id) })

        if (deleteres.acknowledged === true && deleteres.deletedCount > 0) {
            res.status(200).send({ status: true, message: "Successfully deleted" })
        }
        else {
            res.status(200).send({ status: false, message: "No data found" })
        }
    }
    catch (err) {
        console.log("error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }
})


exports.update_gym_equipments = asyncHandler(async (req, res) => {

    try {

        const {
            equipment_name,
            equipment_brand,
            equipment_model_number,
            description,
            _id
        } = req.body
      
        if (_id && equipment_model_number) {
            const resupdata=  await GymEquipments.updateOne({
                   _id:new mongo.ObjectId(_id),
                    equipment_model_number:equipment_model_number
                },{
                    $set:{
                        description:description,
                        equipment_name:equipment_name,
                        equipment_brand:equipment_brand,
                        equipment_model_number:equipment_model_number,
                        equipment_image: req?.file?.path?.replaceAll("\\", "/"),
                    }
                })
                if(resupdata.modifiedCount>0){
                    res.status(200).send({ status: true, message: "Successfully updated data" })
                }
                else{
                    res.status(200).send({ status: true, message: "No data updated" })
                }
  
        }
    }
    catch (err) {
        console.log("error", err)
        res.status(200).send({ status: false, message: "Something went wrong" })
    }
})

exports.get_all_gym_equipments=asyncHandler(async(req,res)=>{
    try{
         const gymres=await GymEquipments.find({})
         if(gymres.length>0){
            res.status(200).send({status:true,data:gymres})
         }
         else{
            res.status(200).send({status:true,message:"No Equipment"})
         }
    }
    catch(err){
        res.status(200).send({status:false,message:"Something went wrong"})
    }
})