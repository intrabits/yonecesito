var Sequelize = require('sequelize');
var sequelize = require('./../../../config').sequelize;

var Categoria = sequelize.define('categoria', {

  titulo: {
    type: Sequelize.STRING(140),
  },
  descripcion: {
    type: Sequelize.STRING,
  },
  clave:{
    type: Sequelize.STRING(25), // la ruta con la que la cargaremos. Ej: categorias/ropa
  },
  foto:{
    type: Sequelize.STRING,
  },
  prioridad:{
    type: Sequelize.INTEGER, // el orden con el que aparecerá en el menú
  },
}, {
  // timestamps: false,
  // paranoid: true,
  // undescored:true,
  freezeTableName: true
});

Categoria.sync().done(function (data) {
  // if (data) {console.log('Modelo archivo actualizado');}
});

module.exports = Categoria;
