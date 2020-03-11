var mongoose=require("mongoose"),
    Comment=require("./models/comment.js"),
    Campgrounds=require("./models/campgrounds.js");

var data=[
    { name:"cloud",
image:"https://images.unsplash.com/photo-1458668383970-8ddd3927deed?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{ name:"desert",
image:"https://images.unsplash.com/photo-1444076784383-69ff7bae1b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
{ name:"forest",
image:"https://images.unsplash.com/photo-1500762728065-466b7a170c96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
]
module.exports=()=>{
    Campgrounds.remove({},(err)=>
    {
        // if(!err)
        // {
        //     console.log("removed campgrounds");
        // }
        // else
        // {
        //     console.log(err);
        // }
        // data.forEach((seed)=>
        // {
        //     Campgrounds.create(seed,(err,createdCamp)=>
        //     {
        //         if(err)
        //         {
        //             console.log(err);
        //         }
        //         else
        //         {
        //             console.log("campgrounds added!!");
        //             Comment.create(
        //                 {
        //                     text:"qwerty123",
        //                     author:"professional street nigga"
        //                 },(err,createdcomment)=>
        //                 {
        //                     if(err)
        //                     {
        //                         console.log(err)
        //                     }
        //                     else
        //                     {
        //                         console.log("created new comment");
        //                         createdCamp.comments.push(createdcomment);
        //                         createdCamp.save();                           
        //                     }
        //             })
        //         }
                    
        //     })
        // })    
    })  ;
}   