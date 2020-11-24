const express = require("express");
const path = require("path");
const login = express.Router();
const bcrypt = require("bcryptjs");
const mongo = require("mongoose");
const adminScheme = require("./adminScheme");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("../database");
const bodyParser = express.urlencoded({ extended: false });
login.use(cookie());

login.get("/", (req, res) => {
    const token = req.cookies["token"];
    if(token) {
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) {
                res.render("../view/login");
            } else {
                res.cookie("token", token, { express: 400000 + Date.now() });
                res.redirect("/dashboard");
            }
        })
    } else {
        res.render("../view/login");
    }
});

login.post("/", bodyParser, async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const getuser = await adminScheme.findOne({username: username});
        const isVerify = bcrypt.compare(password, getuser.password);
        if(isVerify) {
            jwt.sign(JSON.stringify(getuser), process.env.AUTH_TOKEN, (err, token) => {
                if(err) {
                    res.redirect("/login?msg=<span class='red-text'>Refresh page and try again</span>");
                } else {
                    res.cookie("token", token, { express: 400000 + Date.now() });
                    res.status(201).redirect("/dashboard");
                }
            })
        } else {
            res.redirect("/login?msg=<span class='red-text'>Password is wrong</span>");
        }
    } catch (error) {
        res.status(400).redirect("/login?msg=<span class='red-text'>User not found</span>");
    }
})

module.exports = login;