const express = require("express");
const multer = require("multer");
const fs=require('fs');
const path = require("path");

const storage=multer.diskStorage({
  destination:function(req,file,callback){
    let filepath=""
    switch(file.fieldname){
      case 'image':
        filepath="./assets"
        break;
        case 'equipments':
        filepath="./assets/equipments"
        break;
        case 'uploadcv':
          filepath="./assets/cv"
          break;
        default:
        filepath="./assets"
        break;
    }
   if(!fs.existsSync(filepath)){
    fs.mkdirSync(filepath)
 }
callback(null,filepath)
},
filename:function(req,file,callback){
  callback(null,new Date().getTime()+path.extname(file.originalname))
}
})

const upload=multer({storage:storage})
module.exports=upload