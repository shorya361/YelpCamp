var express=require("express");
var router=express.Router();
var user= require("../models/user.js");

router.get("/user/:id",(req,res)=>{
    
        user.findById(req.params.id).exec((err,foundUser)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(foundUser);
                res.render("User/user");
            }
        })
    
})
module.exports=router;