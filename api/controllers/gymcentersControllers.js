const GymCenters = require("../models/gymcenters");
const Users = require("../models/users");
const asyncHandler = require("../../middleware/async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongo = require("mongodb");
const { default: mongoose } = require("mongoose");
const { isEmpty } = require("../../generalfunction");
const gymcenters = require("../models/gymcenters");
require("dotenv").config;

exports.get_center_list_by_userid = asyncHandler(async (req, res) => {
  const gymdata = await GymCenters.find();

  if (req.params.userid !== undefined) {
    const gymdata = await GymCenters.find({
      created_by_userid: new mongo.ObjectId(req.params.userid),
      active_status: true,
    });
    console.log(gymdata);
    if (gymdata?.length > 0)
      res.status(200).send({ status: true, data: gymdata });
    else {
      res.status(200).send({ status: false, data: gymdata });
    }
  }
});

exports.gym_data_by_country = asyncHandler(async (req, res) => {
  const searchdata = await GymCenters.find({
    country: req.params.country,
    active_status: true,
    verify_status: true,
  });

  if (searchdata.length > 0) {
    res.status(200).send({ data: searchdata, status: true });
  } else {
    res.status(200).send({ message: "No data", status: false });
  }
});
exports.gym_country_list = asyncHandler(async (req, res) => {
  try {
    const gymdatacountry = await GymCenters.distinct("country");
    if (gymdatacountry.length > 0) {
      res.status(200).send({ status: true, data: gymdatacountry });
    } else {
      res
        .status(200)
        .send({ status: false, data: gymdatacountry, message: "No data" });
    }
  } catch (err) {
    console.log("Error", err);
    res.status(200).send({ status: false, message: "Something went wrong" });
  }
});

exports.get_gym_data_by_id = asyncHandler(async (req, res) => {
  const gymdata = await GymCenters.findOne({
    _id: new mongo.ObjectId(req.params.gymid),
  });

  res.status(200).send({ status: true, message: gymdata });
});

exports.gym_delete_by_id = asyncHandler(async (req, res) => {
  try {
    const deletedata = await GymCenters.deleteOne({
      _id: req.params.gymid,
    });

    if (deletedata.acknowledged === true && deletedata.deletedCount === 1) {
      res
        .status(200)
        .send({ status: true, message: "Deleted Record Successfully" });
    } else {
      res.status(200).send({ status: false, message: "Invalid record" });
    }
  } catch (err) {
    console.log("error", err);
    res.status(200).send({ status: false, message: "Something went wrong" });
  }
});

exports.gym_delete_all_record = asyncHandler(async (req, res) => {
  try {
    const deletedata = await GymCenters.deleteMany({});

    if (deletedata?.acknowledged === true && deletedata?.deletedCount > 0) {
      res
        .status(200)
        .send({ status: true, message: "Deleted All Record Successfully" });
    } else {
      res.status(200).send({ status: false, message: "No Data" });
    }
  } catch (err) {
    res.status(200).send({ status: false, message: "Something went wrong" });
  }
});

exports.gym_locationbase_data = asyncHandler(async (req, res) => {
  const splittext = req.params.searchdata.split(" ");

  var address = splittext[0];
  for (let index = 1; index < splittext.length - 1; index++) {
    address = address.concat(` ${splittext[index]}`);
  }

  var searchdata;
  if (!isEmpty(splittext[0]) && !isEmpty(splittext[splittext.length - 1])) {
    searchdata = await GymCenters.find({
      $and: [
        { address: { $regex: address.trim(), $options: "is" } },
        {
          pincode: { $regex: splittext[splittext.length - 1], $options: "is" },
        },
      ],
    });
  } else {
    if (splittext[0]) {
      searchdata = await GymCenters.find({
        address: { $regex: address.trim(), $options: "is" },
      });
    } else {
      if (!isEmpty(splittext)) {
        searchdata = await GymCenters.find({
          $or: [
            { address: { $regex: splittext, $options: "is" } },
            { pincode: { $regex: splittext, $options: "is" } },
          ],
        });
      }
    }
  }

  if (searchdata.length > 0) {
    res.status(200).send({ data: searchdata, status: true });
  } else {
    res.status(200).send({ message: "No data", status: false });
  }
});

exports.center_search_data = asyncHandler(async (req, res) => {
  const searchdata = req.params.searchdata;

  var searchlist = await GymCenters.find({
    $or: [
      { address: { $regex: searchdata, $options: "is" } },
      { pincode: { $regex: searchdata, $options: "is" } },
    ],
  });
  console.log(searchdata, searchlist);
  if (searchdata?.length > 0) {
    res.status(200).send({ status: true, data: searchlist });
  } else {
    this.gym_locationbase_data(req, res);
    //    res.status(200).send({status:true,data:[]})
  }
});

exports.get_gym_all_data = asyncHandler(async (req, res) => {
  //  const gymdata = await GymCenters.find().sort({ created_date: 'desc' })
  const gymdata = await GymCenters.find();

  res.status(200).send({ data: gymdata, status: true });
});

exports.get_verify_all_data = asyncHandler(async (req, res) => {
  //  const gymdata = await GymCenters.find().sort({ created_date: 'desc' })
  const gymdata = await GymCenters.find({
    verify_status: true,
    active_status: true,
  });

  res.status(200).send({ data: gymdata, status: true });
});

// exports.gymcenterRegister = asyncHandler(async (req, res) => {
//   try {
//     const {
//       center_name,
//       address,
//       state,
//       country,
//       pincode,
//       contact_number,
//       district,
//       description,
//       email,
//       centeremail,
//       password,
//       gstnumber,
//       pannumber,
//       centertype,
//       lat,
//       lng,
//       created_by_userid,
//       equipmentData,
//     } = req.body;

//     const imagedata = req.files;
//     const imagepaths = [];
//     for (let i = 0; i < imagedata.length; i++) {
//         let path = imagedata[i].path.replace("\\", "/")
//         imagepaths.push(path)
//     }
//     const userdata = await Users.find({ email: email });
//     const findres = await GymCenters.find({ gstnumber: gstnumber });

//     if (findres.length > 0) {
//       res.status(200).send({ status: false, message: "Already exist" });
//     } else {
//       if (userdata.length > 0) {
//         if (password) {
//           let encryptedPassword = bcrypt.hashSync(password, 10);
//           const updateresponse = await Users.updateOne(
//             { _id: userdata[0]?._id },
//             { $set: { password: encryptedPassword } }
//           );
//           if (findres?.length === 0) {
//             const data = await GymCenters.create({
//               center_name: center_name,
//               address: address,
//               state: state,
//               country: country,
//               district: district,
//               pincode: pincode,
//               contact_number: contact_number,
//               description: description,
//               photos: imagepaths,
//               gstnumber: gstnumber,
//               pannumber: pannumber,
//               created_by_userid: userdata[0]._id,
//               centertype: centertype,
//               email: email,
//               centeremail: centeremail,
//               lat: lat,
//               lng: lng,
//               equipmentData: equipmentData,
//             });
//             res.status(200).send({
//               data: data,
//               status: true,
//               message: "Successfully Added",
//             });
//           }
//         } else {
//           const updateresponse = await Users.updateOne(
//             { _id: userdata[0]._id },
//             { $set: { email: email } }
//           );
//           const data = await GymCenters.create({
//             center_name: center_name,
//             address: address,
//             state: state,
//             country: country,
//             district: district,
//             pincode: pincode,
//             contact_number: contact_number,
//             description: description,
//             photos: imagepaths,
//             gstnumber: gstnumber,
//             pannumber: pannumber,
//             created_by_userid: userdata[0]?._id,
//             centertype: centertype,
//             email: email,
//             centeremail: centeremail,
//             lat: lat,
//             lng: lng,
//             equipmentData: equipmentData,
//           });
//           console.log("re1", data);
//           res
//             .status(200)
//             .send({ data: data, status: true, message: "Successfully Added" });
//         }
//       } else {
//         console.log("use1r", userdata, findres);

//         if (password) {
//           let encryptedPassword = bcrypt.hashSync(password, 10);
//           let userdatares = await Users.create({
//             email: email,
//             password: encryptedPassword,
//             post_code: pincode,
//             description,
//             user_type: centertype,
//             photo: imagepaths[0],
//           });

//           const data = await GymCenters.create({
//             center_name: center_name,
//             address: address,
//             state: state,
//             country: country,
//             district: district,
//             pincode: pincode,
//             contact_number: contact_number,
//             description: description,
//             photos: imagepaths,
//             gstnumber: gstnumber,
//             pannumber: pannumber,
//             created_by_userid: userdatares?._id,
//             centertype: centertype,
//             email: email,
//             centeremail: centeremail,
//             lat: lat,
//             lng: lng,
//             equipmentData: equipmentData,
//           });
//           res.status(200).send({
//             data: data,
//             status: true,
//             message: "Successfully created",
//           });
//         } else {
//           const data = await GymCenters.create({
//             center_name: center_name,
//             address: address,
//             state: state,
//             country: country,
//             district: district,
//             pincode: pincode,
//             contact_number: contact_number,
//             description: description,
//             photos: imagepaths,
//             gstnumber: gstnumber,
//             pannumber: pannumber,
//             created_by_userid: userdata[0]?._id,
//             centertype: centertype,
//             email: email,
//             centeremail: centeremail,
//             lat: lat,
//             lng: lng,
//           });
//           res
//             .status(200)
//             .send({ status: true, message: "Successfully created" });
//         }
//       }
//     }
//   } catch (err) {
//     console.log("Error", err);
//   }
// });

// exports.gymcenterRegister = asyncHandler(async (req, res) => {
//   try {
//     const {
//       center_name,
//       address,
//       state,
//       country,
//       pincode,
//       contact_number,
//       district,
//       description,
//       email,
//       centeremail,
//       password,
//       gstnumber,
//       pannumber,
//       centertype,
//       lat,
//       lng,
//       created_by_userid,
//       equipmentData,
//     } = req.body;

//     const imagedata = req.files;
//     const imagepaths = [];
//     for (let i = 0; i < imagedata.length; i++) {
//       let path = imagedata[i].path.replace("\\", "/");
//       imagepaths.push(path);
//     }

//     const userdata = await Users.find({ email: email });
//     let gymCenter;

//     if (userdata.length > 0) {
//       if (password) {
//         let encryptedPassword = bcrypt.hashSync(password, 10);
//         await Users.updateOne(
//           { _id: userdata[0]?._id },
//           { $set: { password: encryptedPassword } }
//         );
//       } else {
//         await Users.updateOne(
//           { _id: userdata[0]._id },
//           { $set: { email: email } }
//         );
//       }
//     } else {
//       if (password) {
//         let encryptedPassword = bcrypt.hashSync(password, 10);
//         let userdatares = await Users.create({
//           email: email,
//           password: encryptedPassword,
//           post_code: pincode,
//           description,
//           user_type: centertype,
//           photo: imagepaths[0],
//         });
//         created_by_userid = userdatares._id;
//       }
//     }

//     const existingGymCenter = await GymCenters.findOne({
//       gstnumber: gstnumber,
//     });

//     if (existingGymCenter) {
//       gymCenter = existingGymCenter;
//     } else {
//       gymCenter = new GymCenters({
//         center_name: center_name,
//         address: address,
//         state: state,
//         country: country,
//         district: district,
//         pincode: pincode,
//         contact_number: contact_number,
//         description: description,
//         photos: imagepaths,
//         gstnumber: gstnumber,
//         pannumber: pannumber,
//         created_by_userid: created_by_userid,
//         centertype: centertype,
//         email: email,
//         centeremail: centeremail,
//         lat: lat,
//         lng: lng,
//         equipmentData: [],
//       });
//     }

//     for (let i = 0; i < equipmentData.length; i++) {
//       const {
//         equipment_name,
//         about_us,
//         equipment_brand,
//         equipment_modal_number,
//         equipment_image,
//       } = equipmentData[i];

//       const equipment = {
//         equipment_name,
//         about_us,
//         equipment_brand,
//         equipment_modal_number,
//         equipment_image,
//       };

//       gymCenter.equipmentData.push(equipment);
//     }

//     const data = await gymCenter.save();

//     return res
//       .status(200)
//       .send({ data: data, status: true, message: "Successfully created" });
//   } catch (err) {
//     console.log("Error", err);
//     return res
//       .status(500)
//       .send({ status: false, message: "Failed to create", error: err });
//   }
// });



require('dotenv').config()
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const bucketName = process.env.BUCKET_NAME
const accessKey = process.env.ACCESS_KEY
const secretKey = process.env.SECRET_KEY
const bucketRegion = process.env.BUCKET_REGION

const S3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    },
    region: bucketRegion
})

//@aws-sdk/client-s3 @aws-sdk/s3-request-presigner
// AWS.config.update({
//   accessKeyId: 'AKIAXXYNSZFWZHIB7HWW',
//   secretAccessKey: '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',
//   region: 'superactiveimages',
// });

// const s3 = new AWS.S3();
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'superactiveimages',
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       cb(null, 'unique-file-name.jpg'); // Provide a unique file name or generate one dynamically
//     },
//   }),
// });

// exports.gymcenterRegister = async (req, res) => {
//   const {
//     center_name,
//     address,
//     state,
//     country,
//     pincode,
//     contact_number,
//     district,
//     description,
//     email,
//     centeremail,
//     password,
//     gstnumber,
//     pannumber,
//     centertype,
//     lat,
//     lng,
//     created_by_userid,
//     equipmentData,
//     amentitiesData,
//     scheduleData,
//     newTrainerData,
//   } = req.body;

//   try {
//     upload.single('centerBanner')(req, res, async function (err) {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Failed to upload image' });
//       }
//       console.log(req.file);
//       const imageUrl = req.file;

//       const data = await GymCenters.create({
//         center_name,
//         address,
//         state,
//         country,
//         pincode,
//         contact_number,
//         district,
//         description,
//         email,
//         centeremail,
//         password,
//         gstnumber,
//         pannumber,
//         centertype,
//         lat,
//         lng,
//         centerBanner: imageUrl,
//         created_by_userid,
//         equipmentData: [],
//         amentitiesData: [],
//         scheduleData: [],
//         newTrainerData: [],
//       });

//       res.status(200).json({
//         status: 'created center',
//         data: data,
//       });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: 'Failed to create center',
//     });
//   }
// };


exports.gymcenterRegister=async(req, res)=>{
  

        for (const key in req.files) {
          const uuid = uuidv4();
          const file = req.files[key][0];
          const ext = path.extname(file.originalname)
          const f = {
              Bucket: bucketName,
              Key: `${uuid}${ext}`,
              Body: file.buffer,
              ContentType: file.mimetyp
          }
          const command = new PutObjectCommand(f)
          await S3.send(command)
          req.body[key] = `${uuid}${ext}`;
      }
      const {
        center_name,
        address,
        state,
        country,
        pincode,
        contact_number,
        district,
        description,
        email,
        centeremail,
        password,
        gstnumber,
        pannumber,
        centertype,
        lat,
        lng,
        centerBanner,
        created_by_userid,
        equipmentData,
        amentitiesData,
        scheduleData,
        newTrainerData
      } = req.body;

        

        const data=await GymCenters.create({
          center_name,
          address,
          state,
          country,
          pincode,
          contact_number,
          district,
          description,
          email,
          centeremail,
          password,
          gstnumber,
          pannumber,
          centertype,
          lat,
          lng,
          centerBanner,
          created_by_userid,
          equipmentData:[],
          amentitiesData:[],
          scheduleData:[],
          newTrainerData:[]
        })
        res.status(200).json({
          status:"created center",
          data:data
        })
}

exports.updategymaccount = asyncHandler(async (req, res) => {
  const {
    _id,
    center_name,
    address,
    state,
    country,
    pincode,
    contact_number,
    district,
    description,
    image,
    photos,
    gstnumber,
    centertype,
    centeremail,
    pannumber,
    lat,
    lng,
    email,
    password,
    created_by_userid,
  } = req.body;
  let temppath = [];
  if (photos !== undefined) {
    let temp = photos.split(",");
    const filtered = temp.filter((elem) => elem !== "");
    if (filtered.length > 0) {
      temp?.map((item) => {
        temppath.push(item);
      });
    } else {
      temppath = [];
    }
  } else {
    temppath = [];
  }

  const imagedata = req.files;

  for (let i = 0; i < imagedata.length; i++) {
    let path = imagedata[i].path.replace("\\", "/");
    temppath?.push(path);
  }

  const findata = await GymCenters.find({
    _id: new mongoose.Types.ObjectId(_id),
  });
  const userdata = await Users.find({ email: email });
  console.log("usedata", userdata);
  if (findata.length > 0) {
    const resupdata = await GymCenters.updateMany(
      {
        _id: new mongoose.Types.ObjectId(_id),
      },
      {
        $set: {
          center_name: center_name ?? center_name,
          address: address ?? address,
          state: state ?? state,
          country: country ?? country,
          pincode: pincode ?? pincode,
          contact_number: contact_number,
          district: district ?? district,
          description: description ?? description,
          photos: temppath ?? temppath,
          gstnumber: gstnumber ?? gstnumber,
          centertype: centertype ?? centertype,
          created_by_userid: created_by_userid ?? created_by_userid,
          email: email,
          centeremail: centeremail ?? centeremail,
          pannumber: pannumber ?? pannumber,
          lat: lat ?? lat,
          lng: lng ?? lng,
        },
      }
    );

    if (email !== null || email != undefined) {
      if (userdata?.length > 0) {
        if (password) {
          let encryptedPassword = bcrypt.hashSync(password, 10);
          const updateresponse = await Users.updateOne(
            { _id: userdata[0]._id },
            {
              $set: {
                password: encryptedPassword ?? encryptedPassword,
                email: email ?? email,
                user_type: centertype ?? centertype,
                post_code: pincode ?? pincode,
              },
            }
          );
        }
      }
    }

    if (resupdata.acknowledged === true && resupdata.modifiedCount > 0) {
      res.status(200).send({ status: true, message: "Successfully Updated" });
    } else {
      res.status(200).send({ status: false, message: "No Updated" });
    }
  } else {
    this.gymcenterRegister(req, res);
  }
});

exports.deactivatecenter = asyncHandler(async (req, res) => {
  const gymid = req.params.gymid;
  const updateres = await GymCenters.updateMany(
    { _id: new mongoose.Types.ObjectId(gymid) },
    {
      $set: {
        active_status: false,
      },
    }
  );
  if (updateres.acknowledged === true && updateres.modifiedCount > 0) {
    res.status(200).send({ status: true, message: "Successfully Deleted" });
  } else {
    res.status(200).send({ status: false, message: "Already Deleted" });
  }
  console.log("login-------", updateres);
});

exports.updategymfeaturebyid = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await GymCenters.findById(id);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Add multiple data to the "empl" array start

    const equip = req.body.equipmentData;
    const aminities = req.body.amentitiesData;
    const schedule = req.body.scheduleData;
    const newTrainer = req.body.newTrainerData;
    console.log(schedule,newTrainer); 
    switch (true) {
      case equip !== undefined && Array.isArray(equip) && equip.length > 0:
        company.equipmentData.push(...equip);
        break;
      case aminities !== undefined &&
        Array.isArray(aminities) &&
        aminities.length > 0:
        company.amentitiesData.push(...aminities);
        break;
      case schedule !== undefined &&
        Array.isArray(schedule) &&
        schedule.length > 0:
        company.scheduleData.push(...schedule);
        break;
      case newTrainer !== undefined &&
        Array.isArray(newTrainer) &&
        newTrainer.length > 0:
        company.newTrainerData.push(...newTrainer);
        break;
      default:
        console.log("failed to push data");
        break;
    }
    const data = await company.save();

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  
};
