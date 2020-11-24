const express = require("express");
const path = require("path");
const mongo = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemail = require("nodemailer");
const contact = express.Router();
require("../database");
const contactScheme = require("./contactScheme");

require("dotenv").config();
const title = process.env.TITLE;
const sender_email = process.env.EMAIL;
const smtp_email = process.env.SMTP_EMAIL;
const smtp_password = process.env.SMTP_PASSWORD;
const bodyParser = express.urlencoded({ extended: false });

const transporter = nodemail.createTransport({
    service: "gmail",
    auth: {
        user: smtp_email,
        pass: smtp_password
    }
});

contact.get("/", (req, res) => {
    res.render("../view/contact", {"title": title});
});

contact.post("/", bodyParser, async(req, res) => {
    try {
            let name = req.body.name;
            let email = req.body.email;
            let phoneno = req.body.phoneno;
            let subject = req.body.subject;
            let message = req.body.message;
        const contact = new contactScheme({
            name: name,
            email: email,
            phoneno: phoneno,
            subject: subject,
            message: message,
            date: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`
        });
        await contact.save();
       const mailerOptions = {
           from: "moviescraz55@gmail.com",
           to: sender_email,
           subject: "Contact form submitted at - " + title,
            text: `
                ${name},
                ${email},
                ${phoneno},
                ${subject},
                ${message}
            `
       };
       transporter.sendMail(mailerOptions, (err, info) => {
           if(err) {
               console.log(err);
           }
       })
        res.redirect("/contact?msg=<span class='green-text'>Your message has been sent.</span>");
    } catch (error) {
        res.redirect("/contact?msg=<span class='red-text'>Task fail to execute</span>");
    }
});

module.exports = contact;