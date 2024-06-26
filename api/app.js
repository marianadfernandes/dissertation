var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const express = require("express");
const { Client } = require('pg');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tabelaRouter = require('./routes/tabela');
var bodyPartsRouter = require('./routes/body_parts_tabela');
var medicamentoRouter = require('./routes/medicamento');

// Postgres
// const client = new Client({
// 	user: 'postgres',
// 	password: 'admin',
// 	host: 'localhost',
//   // host: 'db', // docker-compose
// 	port: '5432',
// 	database: 'projeto',
// });

// client
// 	.connect()
// 	.then(() => {
// 		console.log('Connected to PostgreSQL database');
// 	})
// 	.catch((err) => {
// 		console.error('Error connecting to PostgreSQL database', err);
// 	});

function connectWithRetry() {
  const client = new Client({
    // host: 'localhost',
    host: 'db', // docker-compose
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'projeto',
  });

  client.connect((err) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    } else {
      console.log('Connected to the database');
    }
  });

  client.on('error', (err) => {
    console.error('Database error:', err);
    client.end(); 
    connectWithRetry(); 
  });
}

connectWithRetry();

const app = express();

// Middleware para disponibilizar o cliente PostgreSQL para todas as rotas
app.use((req, res, next) => {
  req.client = client;
  next();
});

// require do mongoose e definição do caminho para a base de dados
// const mongoose = require("mongoose");
// // const uri = "mongodb://db:27017/projeto"; //docker-compose
// const uri = "mongodb://localhost:9000/projeto";

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
app.use('/medicamento', medicamentoRouter)

// conexão com a base de dados
// mongoose.set("strictQuery", true);
// mongoose
//   .connect(uri)
//   .then(() => console.log("Connected."))
//   .catch(() => console.log("Error connecting to MongoDB."));

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
  // set locals, providing error in development and a default title
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = 'Error Page'; // Add the title property here

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
