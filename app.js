var express = require("express");
var app =express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var Campground= require("./models/campgrounds.js");
var seedDb=require("./seeds.js");
var Comment=require("./models/comment.js")
    passport=require("passport"),
    LocalStrategy= require("passport-local"),
    User= require("./models/user"),
    flash=require("connect-flash"),
    methodOverride=require("method-override");

    //requiring routes
var CampgroundRoutes=require("./routes/campgrounds"),
    commentRoutes   =require("./routes/comments"), 
    authRoutes      =require("./routes/index");

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true , useUnifiedTopology: true });

//seedDb(); seed the database

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


mongoose.set("useFindAndModify", false);
//passsport configuration

app.use(require("express-session")({
    secret:"winter is coming",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to make userinfo available at all routes
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success=req.flash("success");
    next();
})

app.use("",authRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",CampgroundRoutes);

app.listen(3000,()=>
{
    console.log("app started!!");  
});
