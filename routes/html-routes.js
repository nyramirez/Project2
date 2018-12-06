// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index.hbs");
    }
    res.sendFile(path.join(__dirname, "../views/signup.hbs"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members.hbs");
    }
    res.sendFile(path.join(__dirname, "../views/index.hbs"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../views/members.hbs"));
  });

  /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('signup');
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('members');
// });

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

};