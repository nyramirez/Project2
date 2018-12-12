// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const fs = require("fs");
let batches = require("../public/batches.json");

module.exports = function(app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        let employee = req.user.dataValues;
        res.json(employee);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
        console.log(req.body);
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            employeeType: req.body.employeeType
        })
            .then(function() {
                res.redirect(201, "/success");
            })
            .catch(function(err) {
                console.log(err);
                // res.json(err);
                res.status(422).json(err.errors[0].message);
            });
    });

    app.get("/api/batches", function (req, res){
        let batchesData = JSON.stringify(batches);
        res.json(batchesData);
    });

    app.put("/api/batches", function(req, res) {
        batches.push(req.body);
        fs.writeFile(
            "public/batches.json",
            JSON.stringify(batches),
            "utf-8",
            function(err) {
                if (err) {
                    return res.status(500).send({
                        error:
                            "Something went wrong trying to save the information submitted. Please try again later."
                    });
                }
                console.log("batches.json updated");
                res.status(201).send({
                    success: "Form successfully submited."
                });
            }
        );
    });

    // Route for logging user out
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id and employeeType
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                username: req.user.username,
                id: req.user.id,
                employeeType: req.user.employeeType
            });
        }
    });

    app.post("/api", function(req, res) {
        console.log(req.body);
        products: {
            range: range,
            finish: finish,
            location: location,
            warehouse: warehouse.val(),
            description: productDescription.val().trim(),
            status: status
        },
        so: {
            salesOrder: salesOrder.val().trim(),
            desription: description.val().trim(),
            material: material.val(),
            orderQty: qty
        },
        po: {
            purchaseOrder: purchaseOrder.val().trim(),
            contact: contact.val().trim(),
            customer: customerName.val().trim()
        }
        db.Product.create(req.body.products);
        db.SO.create(req.body.so);
        db.PO.create(req.body.po);
        db.PO.create({
            purchaseOrder: req.body.purchaseOrder,
            contact: req.body.contact,
            customer: req.body.customer,
            status: req.body.status
        })
            .then(function() {
                res.redirect(201);
            })
            .catch(function(err) {
                console.log(err);
                // res.json(err);
                res.status(422).json(err.errors[0].message);
            });
    });

    app.get("/api/manager", function(req, res) {
        db.Product.findAll().then(function(Products) {
            let hbsObj = { Product: Products };
            res.render("manager", hbsObj);
            console.log(hbsObj);
        });
    });

    // db.SO.findAll().then(SOs => console.log(SOs));

    // db.PO.findAll().then(POs => console.log(POs));
    // res.json({
    //     id: db.products.id,
    //     orderQTY: db.so.orderQty,
    //     range: db.products.range,
    //     finish: db.products.finish,
    //     location: db.products.location,
    //     warehouse: db.products.warehouse,
    //     material: db.so.material,
    //     description: db.products.description,
    //     status: db.products.status
    // });
};
