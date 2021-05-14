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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})

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
