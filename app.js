var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Salmon Creek", image:"http://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg"},
        {name: "Granite Hill", image:"http://www.visitnc.com/contents/imgcrop/61803/1200/630/preview"},
        {name: "Mountain Goat's Rest", image:"http://images.huffingtonpost.com/2015-03-19-1426803829-9735139-8f524af8ef2b50a4dab24786229c28c11.jpg"}
        ]
    res.render("campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started! ");
});