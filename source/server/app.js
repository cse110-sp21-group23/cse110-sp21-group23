'use strict';
require('dotenv').config({ path: './.env' });
const db = require('./app/lib/pg');
const express = require('express');
const userRouter = require('./app/api/user')
var bodyParser = require('body-parser')

// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
  db.migrate()
    .then()
    .catch()
});
