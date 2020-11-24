const express = require("express");
const path = require("path");
const mongo = require("mongoose");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const contactlist = express.Router();
const url = require("url");
require("../database");
const adminScheme = require("./adminScheme");
const postScheme = require("./postScheme");
const contactScheme = require("./contactScheme");

require("dotenv").config();
contactlist.use(cookie());
const title = process.env.TITLE;
const bodyParser = express.urlencoded({ extended: false });

contactlist.get("/", (req, res) => {
    const token = req.cookies["token"];
    if(token) {
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) {
                res.redirect("/login?msg=<span class='red-text'>Please login</span>");
            } else {
                contactScheme.find((err, r) => {
                    res.render("../view/contactlist", {"title": title, "profile": decoded, "contacts": r});
                })
            }
        })
    } else {
        res.redirect("/login?msg=<span class='red-text'>Please login</span>");
    }
});

contactlist.get("/delete", (req, res) => {
    const token = req.cookies["token"];
    if(token) {
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) {
                res.redirect("/login?msg=<span class='red-text'>Please login</span>");
            } else {
                const id = url.parse(req.url, true).query.id;
                contactScheme.deleteOne({_id: id}, (err) => {
                    res.redirect("/contactlist");
                })
            }
        })
    } else {
        res.redirect("/login?msg=<span class='red-text'>Please login</span>");
    }
})

module.exports = contactlist;