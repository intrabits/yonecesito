var express = require('express');
var app = express.Router();

app.use('/users/', require('./../api/user'));
app.use('/necesidades/', require('./../api/necesidad'));
app.use('/categorias/', require('./../api/necesidad/categoria'));
app.use('/comentarios/', require('./../api/necesidad/comentario'));
// app.use('/conciliacion/',auth.isLogged,require('./../api/conciliacion'));

module.exports = app;
