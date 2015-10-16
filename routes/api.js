var express = require('express');
var app  = express.Router();
var auth       = require('./../config/auth.js');

app.use('/users/',auth.isLogged,require('./../api/user'));
// app.use('/archivos/',auth.isLogged,require('./../api/archivo'));
// app.use('/creditos/',auth.isLogged,require('./../api/credito'));
// app.use('/conciliacion/',auth.isLogged,require('./../api/conciliacion'));

module.exports = app;
