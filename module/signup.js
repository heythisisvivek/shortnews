const express = require("express");
const path = require("path");
const signup = express.Router();
const mongo = require("mongoose");
const adminScheme = require("./adminScheme");
require("../database");
const bodyParser = express.urlencoded({ extended: false });

signup.get("/", (req, res) => {
    res.render("../view/signup");
})

signup.post("/", bodyParser, async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        
        if(password != cpassword) {
            res.redirect("/signup?msg=<span class='red-text'>Password not matched</span>");
        } else {
        const adminsignup = new adminScheme({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            password: password,
            gender: req.body.gender,
            dob: req.body.dob,
            date: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`
        })
        await adminsignup.save();
        res.status(201).redirect("/signup?msg=<span class='green-text'>Account created successfully</span>");
        }
    } catch (error) {
        res.status(400).redirect("/signup?msg=<span class='red-text'>Something went wrong</span>");
    }
})

module.exports = signup;