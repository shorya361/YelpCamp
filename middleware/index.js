//
var Campground= require("../models/campgrounds")
var Comment= require("../models/comment")
var middlewareObj={};
middlewareObj.checkCampOwnership= function(req,res,next){
    if(req.isAuthenticated()){
        
        Campground.findById(req.params.id,(err,foundCamp)=>{
            if(err){
                res.redirect("/campgrounds");
            }
            else{
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                    }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    } 
}
middlewareObj.checkCommentOwnership =function(req,res,next){
    if(req.isAuthenticated()){
        
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
                req.flash("error","campground not found.");
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                    }
                else{
                    req.flash("error","You dont have permission to do that.");
                    res.redirect("back"); 
                }
            }
        })
    }
    else{
        req.flash("error","You need to be logged in to do this.");
        res.redirect("back");
    }
}

middlewareObj.isloggedin= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do this.");
    res.redirect("/login");
}


module.exports=middlewareObj;