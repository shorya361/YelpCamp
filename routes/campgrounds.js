var express=require("express");
var router=express.Router();
var Campground= require("../models/campgrounds.js"),
    Comment=require("../models/comment");
var middleware=require("../middleware");// automatically require "index" file 


//INDEX-show all campgrounds
router.get("/",(req,res)=>{
    // console.log(req.user);
    Campground.find({},(err,Camps)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds: Camps,currentUser: req.user});
        }
    });

})

//NEW
router.get("/new",middleware.isloggedin,(req,res)=>{
    res.render("campgrounds/new");
});

//Create- add new grounds in db
router.post("/",middleware.isloggedin,(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var descrip=req.body.description
    // console.log(" jai hind "+req.user);
    var author={
        id: req.user._id,
        username : req.user.username
    }
    var newCamp={
        name: name,
        image:image,
        price:price,
        description:descrip,
        author: author
    }
    Campground.create(newCamp,(err,newlyCreated)=>
    {
        if(err){
            console.log(err);
        }
        else{
            User.findById(req.user._id).exec((err,foundUser)=>
            {
                if(err){
                    console.log(err);
                }
                else{
                foundUser.campgrounds.push(newlyCreated._id);
                foundUser.save()
                console.log(foundUser);
                req.flash("success","Campground successfully created");
                res.redirect("/campgrounds");
                }
                
            })
        }
    });
});
//SHOW
router.get("/:id",(req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err,foundCamp)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundCamp);
            res.render("campgrounds/show",{campground : foundCamp});
        }
    })
});

// edit
router.get("/:id/edit",middleware.checkCampOwnership,(req,res)=>{
    Campground.findById(req.params.id,(err,foundCamp)=>{
        res.render("campgrounds/edit",{campgrounds: foundCamp});                
    })

});
    


//update campgounds
router.put("/:id",middleware.checkCampOwnership,(req,res)=>{
   
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err, updatedCamp)=>{
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            req.flash("success","Camprgound successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// destroy campgrounds
router.delete("/:id",middleware.checkCampOwnership,(req,res)=>{
      Campground.findByIdAndRemove(req.params.id,(err)=>{
          
          req.flash("success","Successfully deleted the campground.");
          res.redirect("/campgrounds");
      })
})





module.exports=router;