var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const express = require("express");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tabelaRouter = require('./routes/tabela');
var bodyPartsRouter = require('./routes/body_parts_tabela');


// require do mongoose e definição do caminho para a base de dados
const mongoose = require("mongoose");
const uri = "mongodb://db:27017/projeto"; //docker-compose
// const uri = "mongodb://localhost:9000/projeto";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tabela', tabelaRouter);
app.use('/body', bodyPartsRouter);

// conexão com a base de dados
mongoose.set("strictQuery", true);
mongoose
  .connect(uri)
  .then(() => console.log("Connected."))
  .catch(() => console.log("Error connecting to MongoDB."));

app.use((req, res, next) => {
  // Set general caching headers
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  next();
});

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

module.exports = app;
