var Sequelize = require('sequelize');
var sequelize = require('./../../../config').sequelize;

var Comentario = sequelize.define('comentario', {

  userId:{
    type: Sequelize.INTEGER,
  },
  necesidadId:{
    type: Sequelize.INTEGER,
  },
  texto:{
    type: Sequelize.STRING,
  },
  util:{
    type: Sequelize.BOOLEAN // marcar este comentario como útil para cubrir la necesidad
  },
  visto:{
    type: Sequelize.BOOLEAN // marcar este comentario como útil para cubrir la necesidad
  }

}, {
  // timestamps: false,
  // paranoid: true,
  // undescored:true,
  freezeTableName: true
});

Comentario.sync().done(function (data) {
  // if (data) {console.log('Modelo archivo actualizado');}
});

module.exports = Comentario;
