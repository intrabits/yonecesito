var express = require('express');
var app = express.Router();
var auth = require('./../config/auth');

app.use('/users/', require('./../api/user'));
app.use('/necesidades/', require('./../api/necesidad'));
app.use('/categorias/', require('./../api/necesidad/categoria'));
app.use('/comentarios/', require('./../api/necesidad/comentario'));
app.use('/admin/',auth.isAdmin, require('./../api/admin'));

module.exports = app;
