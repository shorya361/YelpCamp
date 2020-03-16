var express=require("express");
var router=express.Router();
var passport=require("passport"),
    User= require("../models/user"),
    Comments=require("../models/comment"),
    CAMP=require("../models/campgrounds"),
    middleware=require("../middleware"),
    multer=require("multer"),
    GridFsStorage= require("multer-gridfs-storage"),
    Grid = require('gridfs-stream'),
    path=require("path"),
    methodOverride=require("method-override");

    //root route
router.get("/",(req,res)=>{
    // res.send("this will be the landing page soon");
    res.render('landing');
});

router.get("/user/:id",async (req,res)=>{
    try {
        let campgrounds = [];
        let foundUser = await User.findById(req.params.id);
        console.log("founded user",foundUser);
        for(const id in foundUser.campgrounds) {
            
            const data = await CAMP.findById(foundUser.campgrounds[id]);
            console.log("user's camps",data);
            if(data!=null)
            {
            campgrounds.push(data);
            }            
        }
        console.log(campgrounds);
        res.render("User/open_user",{camps:campgrounds,user:foundUser});
    }
    catch(err){
        console.log(err);
    }
});

//===============
//USER ROUTE
//===============
//user profile page
router.get("/profile/:id", async (req,res)=>{

    try {
        let campgrounds = [];
        let comments=[];
        let foundUser = await User.findById(req.params.id);
        for(const id in foundUser.campgrounds) {
            
            const data = await CAMP.findById(foundUser.campgrounds[id]);
            if(data!=null)
            {
            campgrounds.push(data);
            }
        }

        for(const id in foundUser.comments) {
            
            const data = await Comments.findById(foundUser.comments[id]);
            if(data!=null)
            {
                comments.push(data);

            }
        }
        console.log(campgrounds,comments);
        res.render("User/user",{theUser : foundUser, campgrounds: campgrounds, comment : comments });
    } catch (err) {
        console.log(err);
    }
    

});
//edit user route
router.get("/profile/:id/edit",middleware.isloggedin,(req,res)=>{
    User.findById(req.params.id,(err,foundUser)=>{
        res.render("User/edit",{theUser: foundUser});                
    })

});
//update the user    
router.put("/profile/:id",middleware.isloggedin,(req,res)=>{
   
    User.findByIdAndUpdate(req.params.id,req.body.user,(err, updatedUser)=>{
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            req.flash("success","Profile Updated");
            res.redirect("/profile/" + req.params.id);
        }
    })
});


//===============
//AUTH ROUTES
//===============

// show register form

router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register",(req,res)=>{
    var newUser= new User({username: req.body.username,city: req.body.city})
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