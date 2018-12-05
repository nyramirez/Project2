var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 3020;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const db = require("./models/");
const sequelize = require("sequelize");

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

db.PO.bulkCreate([{purchaseOrder: 5321, contact:"Barbara", customer: "PAN", status: "WIP"}, {purchaseOrder: 78689, contact: "Paul", customer:"WAMP", status: "DELAYED"}, {purchaseOrder: 73489, contact: "Valinda", customer: "ASN", status: "COMPLETE"}]);

db.SO.bulkCreate([{salesOrder: "WAM1123", description: "pipe1", orderQty: 500, status: "WIP", purchaseOrder: 5321}, {salesOrder: "KMAN0832", description: "pipe2", orderQty: 160, status: "WIP", purchaseOrder: 5321}, {salesOrder: "RSTO1709", description: "pipe1", orderQty: 200, status: "COMPLETE", purchaseOrder: 73489}]);

db.Product.bulkCreate([{range: "TYPE-2", finish: "P-P", material: "J55", location: "A55", warehouse: "WH1", description: "pipe1", status: "GOOD", salesOrder: "WAM1123"}, {range: "TYPE-3", finish: "B-B", material: "K55", location: "R22", warehouse: "WH1", description: "pipe1", status: "GOOD", salesOrder: "RSTO1709"}, {range: "TYPE-2", finish: "PE-PE", material: "H40", location: "ZZ14", warehouse: "WH2", description: "pipe3", status: "GOOD", salesOrder: "RSTO1709"}]);

module.exports = app;
