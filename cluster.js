var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

console.log('Cores disponibles: '+numCPUs);

if (cluster.isMaster) {

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
    require("./app.js");
}
