const Gymfaqs = require('../models/gymfaqs')
const GymCenters = require('../models/gymcenters')
const asyncHandler = require('../../middleware/async')
const mongo = require('mongodb')

exports.delete_faqs = asyncHandler(async (req, res) => {
  const resupdata = await Gymfaqs.deleteOne({
    _id: new mongo.ObjectId(req.params.faqid)
  })
  if (resupdata.acknowledged === true && resupdata.deletedCount > 0) {
    res.status(200).send({ status: true, message: "Successfully Deleted" })
  }
  else {
    res.status(200).send({ status: false, message: "Invalid Data" })
  }
})

exports.update_faqs = asyncHandler(async (req, res) => {
  const { _id, question, answer } = req.body
  const resup=await Gymfaqs.updateOne({ _id: new mongo.ObjectId(_id) },
    { $set: { question: question, answer: answer } }
  )

  if(resup.modifiedCount===1){
    res.status(200).send({status:true,message:"Successfully updated"})
  }
  else{
    res.status(200).send({status:false,message:"Already updated"})
  }


})

exports.get_faqs_withoutgymcenterid = asyncHandler(async (req, res) => {
  const resdata = await Gymfaqs.find({ gymcenterid: { $exists: false } })
  res.status(200).send({ status: true, data: resdata })
})
exports.add_faqs = asyncHandler(async (req, res) => {
  const { gymcenterid, question, answer } = req.body

  if (gymcenterid !== undefined) {
    const gymres = await GymCenters.find({ _id: new mongo.ObjectId(gymcenterid) })

    if (gymres?.length > 0) {
      const datares = await Gymfaqs.create({
        gymcenterid: new mongo.ObjectId(gymcenterid),
        question: question,
        answer: answer
      })
      res.status(200).send({ status: true, data: datares })
    }
    else {
      res.status(200).send({ status: false, message: "Invalid Data" })
    }
  }
  else {
    const datares = await Gymfaqs.create({
      question: question,
      answer: answer
    })
    res.status(200).send({ status: true, data: datares })

  }

})

