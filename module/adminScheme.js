const mongo = require("mongoose");
const bcrypt = require("bcryptjs");

const admin = new mongo.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

admin.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    };
    next();
});

module.exports = mongo.model("admin", admin);