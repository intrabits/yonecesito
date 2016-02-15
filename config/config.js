var Sequelize = require('sequelize');
var config = require('./config.json');
var Nark = require('nark');
var Promise = require('bluebird');

exports.sequelize = new Sequelize(config.db.database,config.db.user,config.db.password,{
  host:config.db.host,
  logging:false,
  dialect:config.db.dialect
});

exports.nark = Nark.config({
  // reportTo:'cedric@intrabits.net',
  // mailSettings:{
  //   service: config.mailer.service,
  //   auth: {
  //       user: config.mailer.user,
  //       pass: config.mailer.pass
  //   }
  // },
  // dbSettings:{
  //   database:config.db.database,
  //   user:config.db.user,
  //   password:config.db.password,
  //   host:config.db.host
  // }
});

// exports.connection = connection;
exports.port = config.port;
exports.domain = config.domain;
exports.cryptKey = config.cryptKey;
