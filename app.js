require("babel/register");
var config 	  = require('./config');
// var app    	  = require('./config/express');
var app = require('express')();
var colors 	  = require('colors');

var server = require('http').createServer(app);
var socketio = require('socket.io')(server);

// var socketio = require('socket.io')(server,{serveClient:true});
require('./config/socketio')(socketio);
require('./config/express')(app);

//Rutas exclusivas que usaremos en node.js
app.use('/', require('./routes/index'));

//Api con la que se comunicará Angularjs y las aplicaciones móviles
app.use('/api/', require('./routes/api'));

// Errores más amigables en caso de cosas inesperado
app.use(function(err, req, res, next) {

  console.error(err);
    res.status(err.status || 500);
  res.render('error', {
      message: 'Ocurrió algo inesperado dentro de la aplicación, estamos trabajando para resolverlo.',
      error: {}
  });
});

server.listen(config.port,function () {  
  console.log(colors.blue('=========== Iniciando aplicación. Puerto '+config.port+' ============'));
});

exports = module.exports = app;
