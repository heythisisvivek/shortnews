const express = require("express");
const path = require("path");
const mongo = require("mongoose");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const modifypost = express.Router();
const adminScheme = require("./adminScheme");
const postScheme = require("./postScheme");
const upload = require("express-fileupload");
require("../database");
require("dotenv").config();
modifypost.use(cookie());
modifypost.use(upload());
const title = process.env.TITLE;
const bodyParser = express.urlencoded({ extended: false });

modifypost.get("/", async(req, res) => {
    const token = req.cookies["token"];
    if(token) {
        jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
            if(err) {
                res.redirect("/login?msg=<span class='red-text'>Please login</span>");
            } else {
                res.render("../view/modifypost", {"title": title, "profile": decoded});
            }
        })
    } else {
        res.redirect("/login?msg=<span class='red-text'>Please login</span>");
    }
});

modifypost.post("/", bodyParser, async(req, res) => {
    try {
        const token = req.cookies["token"];
        if(token) {
            await jwt.verify(token, process.env.AUTH_TOKEN, (err, decoded) => {
                if(err) {
                    res.redirect("/login?msg=<span class='red-text'>Please login</span>");
                } else {
                    const file = req.files.file;
                    const filename = file.name;
                    const validext = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
                    if(validext.includes(file.mimetype)) {
                        if(file.size/1024 < 2048) {
                            file.mv("uploads/" + filename, (err) => {
                                if(err) {
                                    res.redirect("/modifypost?msg=<span class='red-text'>Fail to upload image</span>");
                                } else {
                                    const post = new postScheme({
                                        title: req.body.title,
                                        description: req.body.description,
                                        image: filename,
                                        category: JSON.stringify(req.body.category),
                                        author: `${decoded["fname"]} ${decoded["lname"]}`,
                                        status: "1",
                                        publishDate: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`
                                    });
                                    post.save();
                                    res.redirect("/modifypost?msg=<span class='green-text'>Post publish</span>");
                                }
                            })
                        } else {
                            res.redirect("/modifypost?msg=<span class='red-text'>Image size is too big</span>");    
                        }
                    } else {
                        res.redirect("/modifypost?msg=<span class='red-text'>Not an image</span>");
                    }
                }
            })} else {
                res.redirect("/login?msg=<span class='red-text'>Please login</span>");
            }
    } catch(error) {
        res.status(400).redirect("/modifypost?msg=<span class='red-text'>Please provide all required field</span>");
    }
})

module.exports = modifypost;