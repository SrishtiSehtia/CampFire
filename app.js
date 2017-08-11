var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//  SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);
Campground.create({
    name: "Salmon Creek",
    image: "http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg"
}, function(err, campground){
    if(err){
        console.log(err)
    } else {
        console.log("NEWLY CREATED CAMPGOUND:")
        console.log(campground)
    }
});
 
 var campgrounds = [
        {name: "Salmon Creek", image:"http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg"},
        {name: "Granite Hill", image:"http://www.visitnc.com/contents/imgcrop/61803/1200/630/preview"},
        {name: "Mountain Goat's Rest", image:"http://images.huffingtonpost.com/2015-03-19-1426803829-9735139-8f524af8ef2b50a4dab24786229c28c11.jpg"}
        ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started! ");
});