// const createError = require('http-errors');
// const session = require("express-session");
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const passport = require("./config/passport");
const path = require('path');

const express = require('express');
const app = express();
let PORT = process.env.PORT || 3020;
require("./routes/html-routes")(app);

const db = require("./models");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

require("./models/user.js");
require("./config/passport.js");
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// db.sequelize.sync().then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT http://localhost:" + PORT);
//   });
// });

/*db.PO.bulkCreate([{purchaseOrder: 5321, contact:"Barbara", customer: "PAN", status: "WIP"}, {purchaseOrder: 78689, contact: "Paul", customer:"WAMP", status: "DELAYED"}, {purchaseOrder: 73489, contact: "Valinda", customer: "ASN", status: "COMPLETE"}])
  .then(data => {
    console.log(data);
    return db.SO.bulkCreate([{salesOrder: "WAM1123", description: "pipe1", orderQty: 500, status: "WIP", purchaseOrder: 5321}, {salesOrder: "KMAN0832", description: "pipe2", orderQty: 160, status: "WIP", purchaseOrder: 5321}, {salesOrder: "RSTO1709", description: "pipe1", orderQty: 200, status: "COMPLETE", purchaseOrder: 73489}]);
  })
  .then(data => {
    console.log(data);
    db.Product.bulkCreate([{range: "TYPE-2", finish: "P-P", material: "J55", location: "A55", warehouse: "WH1", description: "pipe1", status: "GOOD", salesOrder: "WAM1123"}, {range: "TYPE-3", finish: "B-B", material: "K55", location: "R22", warehouse: "WH1", description: "pipe1", status: "GOOD", salesOrder: "RSTO1709"}, {range: "TYPE-2", finish: "PE-PE", material: "H40", location: "ZZ14", warehouse: "WH2", description: "pipe3", status: "GOOD", salesOrder: "RSTO1709"}]);
  })
  .catch(err => {
    console.log(err);
  });*/

   app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });

module.exports = app;