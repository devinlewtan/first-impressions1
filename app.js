// app.js
const express = require('express');
const path = require('path');
require('./db.js');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

  const port = 3000;
  app.listen(port);
  console.log(`server started on port ${port}`);
