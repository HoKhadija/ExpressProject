const express = require("express");
const moment = require("moment");
// const ejs = require('ejs');
const app = express();


app.use(express.static("public"));
// Middleware 
const checkTime = (req, res, next) => {
    const now = moment();
    const day = now.day();
    const hour = now.hour();

    if (day >= 1 && day <= 7 && hour >= 9 && hour <= 23) {
        next();
    } else {
        res.status(403).send("Sorry, we are closed!");
    }
};

// engine EJS
app.set("view engine", "ejs");

// the routes
app.get("/", checkTime, (req, res) => {
    res.render("homePage");
});

app.get("/ourServices", checkTime, (req, res) => {
    res.render("ourServices");
});

app.get("/contactUs", checkTime, (req, res) => {
    res.render("contactUs");
});


// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});