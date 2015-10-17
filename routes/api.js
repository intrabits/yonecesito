var express = require('express');
var app = express.Router();
var auth = require('./../config/auth.js');

app.use('/users/', auth.isLogged, require('./../api/user'));
app.use('/necesidades/', require('./../api/necesidad'));
app.use('/categorias/', require('./../api/categoria'));
// app.use('/conciliacion/',auth.isLogged,require('./../api/conciliacion'));

module.exports = app;
