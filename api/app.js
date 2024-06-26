var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const express = require("express");
const { Pool, Client } = require('pg');

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

// Configuração do pool de conexões
const pool = new Pool({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  // host: 'db', // Se estiver usando docker-compose
  port: 5432,
  database: 'projeto',
  max: 10, // Número máximo de clientes no pool
  idleTimeoutMillis: 30000, // Tempo de inatividade antes de fechar a conexão
  connectionTimeoutMillis: 2000, // Tempo de espera para estabelecer uma conexão
});

// Eventos do pool
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // Termina o processo em caso de erro fatal
});

const app = express();

// Middleware para disponibilizar o cliente PostgreSQL para todas as rotas
app.use((req, res, next) => {
  console.log('Setting up pool for request');
  req.pool = pool;
  next();
});

// Verifica a conexão imediatamente
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database', err);
  } else {
    console.log('Connected to PostgreSQL database (initial check)');
    client.release();
  }
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
