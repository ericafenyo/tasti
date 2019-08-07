const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');

const db = require('./config')

const app = express();

app.get('/', (request, response) => {

  response.json({message : "Root route"});
});

app.get('/users', (request, response) => {

  db.query('SELECT * FROM user',(error, users) => {
    if(error){
      console.log(error);
      response.sendStatus(500);
      return;
    }
     response.json(users);
  });
});

module.exports = app;
