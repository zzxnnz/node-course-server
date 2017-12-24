const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("year", () => new Date().getFullYear());

app.set({"view engine": "hbs"});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;

    fs.appendFile(__dirname + "/server.log", log + '\n', 
        (err) => {
            if(err) throw err;
        }
    ); 
    console.log(log);

    next();
});

// app.use((req, res, next) => {
//     res.render("maintenanse.hbs");
// });

app.get("/projects", (req, res) => {
    res.render("projects.hbs", {title: "Projects"});
});

app.get("/", (req, res) => {
    // res.send("<h1>Hello Express!</h1>");

    // res.send({
    //     name: "Leonemsolis",
    //     likes: ["Sport", "Chess", "Programming"]
    // });
    res.render("home.hbs", {title: "Home page", welcome: "Welcome to my site!"});
});

app.use(express.static(__dirname + "/public"));

app.get("/about", (req, res) => {
    res.render("about.hbs", {title: "About page"});
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"
    });
});

app.listen(port, () => {
    console.log("Server is up on port: ", port);
});