var express=require("express");
var router=express.Router();
var user= require("../models/user.js"),
    multer=require("multer"),
    GridFsStorage= require("multer-gridfs-storage"),
    Grid = require('gridfs-stream'),
    path=require("path"),
    methodOverride=require("method-override");
router.get("/user/:id",(req,res)=>{
    
        user.findById(req.params.id).exec((err,foundUser)=>{
            if(err){
                console.log(err);
            }
            else{
                //console.log(foundUser);
                res.render("User/user");
            }
        })
    
})
module.exports=router;