var express=require("express");
var router=express.Router();
var passport=require("passport"),
    User= require("../models/user")
    middleware=require("../middleware");

    //root route
router.get("/",(req,res)=>{
    // res.send("this will be the landing page soon");
    res.render('landing');
});




//===============
//AUTH ROUTES
//===============

// show register form

router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register",(req,res)=>{
    var newUser= new User({username: req.body.username})
User.register( newUser,req.body.password,(err,createdUser)=>{
    if(err){
        req.flash("error",err.message);
        return res.render("register");
    }
    else{
        passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to YelpCamp "+ createdUser.username);
            res.redirect("/campgrounds")
        });
    }
})
});

// login form

router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login",passport.authenticate("local",
{   successFlash:"logged you in",
    successRedirect:"/campgrounds",
    failureFlash:"Something went Wrong. Login again",
    failureRedirect:"/login"
}) , (req,res)=>{
    
});

//LOGOUT
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","logged you out!!");
    res.redirect("/campgrounds");
})

module.exports=router;