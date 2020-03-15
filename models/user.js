var mongoose= require("mongoose");
var passportLocalMongoose= require("passport-local-mongoose");
mongoose.set("useFindAndModify", false);
var UserSchema= new mongoose.Schema({
    username: String,
    password: String,
    city: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ],
    campgrounds:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campgrounds"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);
module.exports =mongoose.model("User",UserSchema);