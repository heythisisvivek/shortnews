const express = require("express");
const path = require("path");
const mongo = require("mongoose");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const cookie = require("cookie-parser");
const dashboard = express.Router();
require("../database");
const adminScheme = require("./adminScheme");
const postScheme = require("./postScheme");
const contactScheme = require("./contactScheme");

require("dotenv").config();
dashboard.use(cookie());
const title = process.env.TITLE;

dashboard.get("/", async(req, res) => {
    const token = req.cookies["token"];
    if(token) {
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) {
                res.redirect("/login?msg=<span class='red-text'>Please login</span>");
            } else {
                res.render("../view/dashboard", {"title": title, "profile": decoded});
            }
        })
    } else {
        res.redirect("/login?msg=<span class='red-text'>Please login</span>");
    }
});

module.exports = dashboard;