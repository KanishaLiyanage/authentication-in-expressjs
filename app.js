const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({ //schema for users collection

    email: String,
    password: String

});

const User = new mongoose.model("User", userSchema); //users collection

const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});


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

app.post("/register",function(req, res){

    const newUser = new User({

        email: req.body.username,
        password: req.body.password

    });
    newUser.save(function(err){

        if(err){
            console.log(err);
        }else{
            res.render("secrets");
        }

    });
});

// app.get("/secrets", function(req, res){

//     console.log("Serving root route...");

//     res.render("secrets");

// });


app.listen(port, function(){
    console.log("Server started on port " + port + ".");
});
