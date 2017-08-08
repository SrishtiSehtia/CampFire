var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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