const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});

const userSchema = { //schema for users collection

    email: String,
    password: String

}

const User = new mongoose.model("User", userSchema); //users collection




app.get("/", function(req, res){

    console.log("Serving root route...");

    res.render("home");

});

app.get("/login", function(req, res){

    console.log("Serving root route...");

    res.render("login");

});

app.get("/register", function(req, res){

    console.log("Serving root route...");

    res.render("register");

});

app.get("/secrets", function(req, res){

    console.log("Serving root route...");

    res.render("secrets");

});


app.listen(port, function(){
    console.log("Server started on port " + port + ".");
});
