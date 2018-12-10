// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    app.get("/", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.render("login");
    });

    app.get("/signup", function(req, res) {
        // If the user is logged in check employeetype
        /*if (req.user) {
            let type = req.user.employeeType;
            if (type === "Manager" || type === "HR") {*/
                res.render("signup");
            /*} else {
                let page;
                switch (type) {
                    case "Forklift":
                        page = "forklift";
                        break;
                    case "Clerk":
                        page = "clerk";
                        break;
                }
                setTimeout(function() {
                    console.log(`${page} being redirected to correct page`);
                    res.redirect(`/${page}`);
                }, 3000);
                console.log(
                    "You are not authorized to use this page. You will be redirected in 3 seconds."
                );
            }
        }*/
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, function(req, res) {
        res.render("members");
    });

    app.get("/manager", function(req, res) {
        res.render("members");
    });

    app.get("/success", function(req, res) {
        console.log("trying to render success.handlebars");
        res.render("success.handlebars");
    });

    app.get("/clerk", function(req, res) {
        res.render("officeclerk");
    });

    app.get("/forklift", function(req, res) {
        res.render("groundops");
    });
};
