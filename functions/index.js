const functions = require("firebase-functions");
const express = require('express');
const engines = require('consolidate');

const app = express();
app.engine('ejs', engines.ejs)
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routes = require('./src/routes/main.js');

app.use('/', routes);

exports.app = functions.https.onRequest(app);
