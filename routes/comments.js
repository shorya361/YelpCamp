var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campgrounds"),
    Comment=require("../models/comment");
var middleware=require("../middleware");// automatically require "index" file 

// comments new
router.get("/new",middleware.isloggedin,(req,res)=>{
    Campground.findById(req.params.id,(err,foundCamp)=>{
        if(err){
            console.log(err);

        }
        else{
            res.render("comments/new",{campgrounds: foundCamp});
        }
    })

})
//comments create
router.post("/",middleware.isloggedin,(req,res)=>{
    console.log("post req. sent");
    Campground.findById(req.params.id,(err,foundCamp)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            //console.log(foundCamp,req.body.comment);
            Comment.create(req.body.comment,(err,createdcomment)=>{
                if(err){
                    req.flash("error","Something went wrong!");
                    console.log(err);
                }
                else{
                    createdcomment.author.id= req.user._id;
                    createdcomment.author.username = req.user.username;
                    createdcomment.save(); 
                    foundCamp.comments.push(createdcomment);
                    foundCamp.save();
                    console.log(createdcomment);
                    req.flash("success","Successfully added comment. ")
                    res.redirect("/campgrounds/"+foundCamp._id);
                    
                }
            }); 
        }
    })
})
//comment edit
router .get("/:comment_id/edit",middleware.checkCommentOwnership,(req,res)=>{
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
                console.log(err);
                res.redirect("back");
            }
            else{
                res.render("comments/edit",{campground_id: req.params.id,comment:foundComment});
            }
        })
        
})

//comment update
router.put("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id );
        }
    })
})

//delete comments
router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,(err,foundComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    
})




module.exports=router;