require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// const encrypt = require('mongoose-encryption');
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({

    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false

}));

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({ //schema for users collection

    email: String,
    password: String

});

// const secret = process.env.SECRET;
// userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema); //users collection  


app.get("/", function (req, res) {

    console.log("Serving root route...");

    res.render("home");

});

app.get("/login", function (req, res) {

    console.log("Serving root route...");

    res.render("login");

});

app.get("/register", function (req, res) {

    console.log("Serving root route...");

    res.render("register");

});

app.post("/register", function (req, res) {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

        const newUser = new User({

            email: req.body.username,
            password: hash
            // password: md5(req.body.password)

        });
        newUser.save(function (err) {

            if (err) {
                console.log(err);
            } else {
                res.render("secrets");
            }

        });

    });

});

app.post("/login", function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    // const password = md5(req.body.password);

    User.findOne({ email: username }, function (err, foundUser) {

        if (err) {
            console.log(err);
        } else {

            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {

                    if (result === true) {
                        res.render("secrets");
                    } else {
                        res.render("secrets");
                    }

                });
            } else {
                console.log("Not found!");
            }

        }

    });

});

app.listen(port, function () {
    console.log("Server started on port " + port + ".");
});
