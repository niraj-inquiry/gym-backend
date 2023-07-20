"use strict";
const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth");
const upload = require("../../utils/uploadImage");
const multer = require("multer");
const {
  gymcenterRegister,
  get_gym_all_data,
  gym_locationbase_data,
  gym_delete_all_record,
  gym_delete_by_id,
  get_gym_data_by_id,
  updategymaccount,
  gym_country_list,
  gym_data_by_country,
  get_verify_all_data,
  get_center_list_by_userid,
  deactivatecenter,
  center_search_data,
  updateNewTrainerDataById,
  updateScheduleDataById,
  updateAmentitiesDataById,
  updateEquipmentDataById,
  getGymDatabyId
} = require("../controllers/gymcentersControllers");

const storage = multer.memoryStorage();
const uploadfile = multer({ storage: storage });
router.get('/get-gym-by-id/:id',getGymDatabyId)
router.get("/gym-data-by-country/:country", gym_data_by_country);
router.get("/gym-country-list", gym_country_list);
router.post(
  "/gymcenter-register",
  uploadfile.fields([{ name: "centerBanner", maxCount: 1 }]),
  gymcenterRegister
);
router.get("/gymcenter-data/:gymid", get_gym_data_by_id);
router.get("/gym-all-data", get_gym_all_data);
router.get("/gym-locationbase-data/:searchdata", gym_locationbase_data);
router.delete("/gym-delete-all-record", gym_delete_all_record);
router.delete("/gym-delete-by-id/:gymid", gym_delete_by_id);
router.put(
  "/update-gym-center-data",
  upload.array("image", 12),
  updategymaccount
);
router.get("/get-verify-all-data", get_verify_all_data);
router.get("/get-center-list-by-userid/:userid", get_center_list_by_userid);
router.put("/deactive-center/:gymid", deactivatecenter);
router.get("/search-data/:searchdata", center_search_data);
// router.patch('/update-gym-by-id/:id', updategymfeaturebyid)
router.patch('/add-equipment/:id', updateEquipmentDataById)
router.patch('/add-amenities/:id', updateAmentitiesDataById)
router.patch('/add-gym-schedule/:id', updateScheduleDataById)
router.patch('/add-new-trainer/:id', updateNewTrainerDataById)

module.exports = router;
