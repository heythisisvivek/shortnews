const mongo = require("mongoose");

const post = new mongo.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    publishDate: {
        type: String,
        required: true
    }
});

module.exports = new mongo.model("post", post);