const mongo = require("mongoose");

mongo.connect("mongodb://mongo/news", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection established");
}).catch((e) => {
    console.log("Failed to established");
})
