var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://cdnw.elicdn.com/Blog/wp-content/uploads/2017/04/good-camping.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://s-media-cache-ak0.pinimg.com/originals/a6/37/cf/a637cfb838b99100ae02aa174edd098a.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://s-media-cache-ak0.pinimg.com/originals/68/f7/8c/68f78c433339113fd94be6a2a2e97440.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;