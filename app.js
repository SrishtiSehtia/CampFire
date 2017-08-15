var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB      = require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create({
//     name: "Granite Hill",
//     image: "http://www.visitnc.com/contents/imgcrop/61803/1200/630/preview",
//     description: "This is a hugr granite rock. Serene and secluded. Beautiful sunsets"
// }, function(err, campground){
//     if(err){
//         console.log(err)
//     } else {
//         console.log("NEWLY CREATED CAMPGOUND:")
//         console.log(campground)
//     }
// });

app.get("/", function(req, res){
    res.render("landing");
});
// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
});

// CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err)
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");  
        }
    })
});

// NEW - Show form to create a new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started! ");
});