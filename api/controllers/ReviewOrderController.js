const Revieworder = require('../models/revieworder')
const asyncHandler = require('../../middleware/async')
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');


exports.get_all_review_order = asyncHandler(async (req, res) => {
const response=await Revieworder.find({})
if(response.length>0){
    res.status(200).send({status:true,data:response})
}
else{
    res.status(200).send({status:false,data:response,message:"No Data"})
}
})

exports.delete_review_record_by_id = asyncHandler(async (req, res) => {

    const response = await Revieworder.find({
        userid: req.params.userid,
        selectvendorid: req.params.selectvendorid,
        selectplanid: req.params.selectplanid
    })

    if (response.length > 0) {
        response.forEach(async (item) => {
           const deletes= await Revieworder.deleteOne({ _id: item._id })
       })
        res.status(200).send({ status: true, message: "Successfully Deleted" })
    }
    else {
        res.status(200).send({ status: false, message: "Already Deleted" })
    }

})

exports.delete_all_record = asyncHandler(async (req, res) => {
    const removerevieworder = await Revieworder.deleteMany({})
    if (removerevieworder.acknowledged === true && removerevieworder.deletedCount > 0) {
        res.status(200).send({ status: true, message: "Successfully Deleted" })
    }
    else {
        res.status(200).send({ status: false, message: "Something issue" })
    }
})


exports.get_review_order = asyncHandler(async (req, res) => {

    const getrevieworder = await Revieworder.find({ userid: req.params.user_id })
 
    if (getrevieworder.length > 0) {
       
        let uniq = getrevieworder.filter(({ userid, selectvendorid, selectplanid }, index, a) =>
            a.findIndex(e => userid === e.userid &&
                selectvendorid ===e.selectvendorid &&
                selectplanid === e.selectplanid) === index);

        res.status(200).send({ data: uniq, status: true })
    }
    else {
        res.status(200).send({ status: false, data: getrevieworder })
    }
})

exports.add_review_order = asyncHandler(async (req, res) => {
    const { userid, selectvendorid, selectplanid, data } = req.body

 Revieworder.find({
        $and: [{ userid: userid },
        { selectvendorid: selectvendorid },
        { selectplanid: selectplanid }
        ]
    }).then(async (reviewfind) => {

        if (reviewfind?.length === 0) {

            const createres = await Revieworder.create({
                userid: userid,
                selectvendorid: selectvendorid,
                selectplanid: selectplanid,
                data: data
            })
            res.status(200).send({ status: true, data: createres })

        }
        else {

            res.status(200).send({ status: false, message: "Already exist" })
        }
    })


})