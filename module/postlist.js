const express = require("express");
const path = require("path");
const mongo = require("mongoose");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const postlist = express.Router();
const url = require("url");
const adminScheme = require("./adminScheme");
const postScheme = require("./postScheme");
const upload = require("express-fileupload");
require("../database");

require("dotenv").config();
postlist.use(cookie());
postlist.use(upload());
const title = process.env.TITLE;
const bodyParser = express.urlencoded({ extended: false });

postlist.get("/", (req, res) => {
    const token = req.cookies["token"];
    if(token) {
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) {
                res.redirect("/login?msg=<span class='red-text'>Please login</span>");
            } else {
                postScheme.find((err, r) => {
                    res.render("../view/postlist", {"title": title, "profile": decoded, "posts": r});
                })
            }
        })
    } else {
        res.redirect("/login?msg=<span class='red-text'>Please login</span>");
    }
});

postlist.get("/delete", (req, res) => {
    const token = req.cookies["token"];
    if(token) {
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) {
                res.redirect("/login?msg=<span class='red-text'>Please login</span>");
            } else {
                const id = url.parse(req.url, true).query.id;
                postScheme.deleteOne({_id: id}, (err) => {
                    res.redirect("/postlist");
                })
            }
        })
    } else {
        res.redirect("/login?msg=<span class='red-text'>Please login</span>");
    }
})

module.exports = postlist;