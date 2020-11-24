const expressObj = require("express");
const express = expressObj();
const path = require("path");
const cookie = require("cookie-parser");
const login = require("./module/login");
const signup = require("./module/signup");
const dashboard = require("./module/dashboard");
const modifypost = require("./module/modifypost");
const postlist = require("./module/postlist");
const contact = require("./module/contact");
const contactlist = require("./module/contactlist");
const postScheme = require("./module/postScheme");

require("dotenv").config();
express.use(cookie());
express.set("view engine", "ejs");
express.use(expressObj.static("."));
express.use("/login", login);
express.use("/signup", signup);
express.use("/dashboard", dashboard);
express.use("/modifypost", modifypost);
express.use("/postlist", postlist);
express.use("/contact", contact);
express.use("/contactlist", contactlist);
const title = process.env.TITLE;
const port = process.env.PORT || 3000;

express.get("/", async(req, res) => {
    try {
        await postScheme.find((err, r) => {
            if(err) {
                console.log("Failed to establised");
            } else {
                res.render(path.join(__dirname, "view"), {"title": title, "posts": r});
            }
        })
    } catch(error) {
        console.log("Failed to establised");
    }
})

express.get("/about", (req, res) => {
    res.render(path.join(__dirname, "view/about"), {"title": title});
})

express.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
})

express.listen(port, (req, res) => { console.log(`Server is running at ${port}`) });