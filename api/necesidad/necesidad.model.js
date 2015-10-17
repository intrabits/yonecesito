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
  categoriaId:{
    type: Sequelize.INTEGER,
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
