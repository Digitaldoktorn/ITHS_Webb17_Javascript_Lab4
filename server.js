const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;

// BodyParser helps Express to process urlencoded form
app.use(bodyParser({ extended: true }));
app.use(bodyParser.json());



// connect to local Mongo database (see db.js file)
MongoClient.connect(db.url, (err, database) => {
  if(err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
  console.log(`Server is running on port ${port}! Enter bash command 'npm start' to start the frontend app (client folder).`);
  })
});
