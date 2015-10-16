var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Archivo = sequelize.define('archivo', {
  ref:{
    type: Sequelize.STRING,
  },
  ruta: {
    type: Sequelize.STRING,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  userId:{
    type: Sequelize.INTEGER,
  }
}, {
  // timestamps: false,
  // paranoid: true,
  // undescored:true,
  freezeTableName: true
});

Archivo.sync().done(function (data) {
  // if (data) {console.log('Modelo archivo actualizado');}
});

module.exports = Archivo;
