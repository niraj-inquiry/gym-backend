
const jwt = require("jsonwebtoken");
const User=require('../api/models/users');
const mongoose = require('mongoose')

const verifytokenrole= async(req, res, next) => {
  const token=req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token,"secretkey");
    req.user = decoded;

const userres=await User.findOne({_id:new mongoose.Types.ObjectId(req.user.id)})
if(userres.user_type==='admin'){
  return next();
}

  
  } catch (err) {
    return res.status(401).send("Invalid User");
  }

};

module.exports = verifytokenrole;