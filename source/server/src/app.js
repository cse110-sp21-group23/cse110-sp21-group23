'use strict';
require('dotenv').config();
const db = require('./app/lib/pg');
const express = require('express');
const userRouter = require('./app/api/user')
var bodyParser = require('body-parser')

// Constants
const PORT = 1000;
const HOST = '0.0.0.0';

db.migrate()
  .then()
  .catch()

// App
const app = express();
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log(process.env.DB_HOST)
  // res.status(200)
  res.send(' aaass: ');
});

app.use('/user', userRouter);

app.listen(PORT, HOST);
console.log(`Running on PORT 1000`);
