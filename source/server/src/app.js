'use strict';
require('dotenv').config({ path: '../.env' });
const db = require('./app/lib/pg');
const express = require('express');
const userRouter = require('./app/api/user')
var bodyParser = require('body-parser')

// Constants
const PORT = process.env.PORT || 8080;

db.migrate()
  .then()
  .catch()

// App
const app = express();
app.use(bodyParser.json())

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);

});
