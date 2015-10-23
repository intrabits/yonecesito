var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Necesidad = sequelize.define('necesidad', {

  titulo: {
    type: Sequelize.STRING(140),
  },
  descripcion: {
    type: Sequelize.STRING,
  },
  userId:{
    type: Sequelize.INTEGER,
  },
  foto:{
    type: Sequelize.STRING,
  },
  thumb:{
    type: Sequelize.STRING,
  },
  categoriaId:{
    type: Sequelize.INTEGER,
  },
  cubierta:{
    type: Sequelize.BOOLEAN // necesidad para la que ya se encontró proveedor, al quedar cubierta no seguirá apareciendo
  }
}, {
  // timestamps: false,
  // paranoid: true,
  // undescored:true,
  freezeTableName: true
});

Necesidad.sync().done(function (data) {
  // if (data) {console.log('Modelo archivo actualizado');}
});

module.exports = Necesidad;
