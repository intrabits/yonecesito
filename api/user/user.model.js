var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var User = sequelize.define('user', {

  name: {
    type: Sequelize.STRING(50)
  },
  surname: {
    type: Sequelize.STRING(50)
  },
  email:{
    type: Sequelize.STRING(60)
  },
  password: {
    type: Sequelize.STRING
  },
  facebook:{
    type: Sequelize.STRING(40)
  },
  twitter:{
    type: Sequelize.STRING(40)
  },
  google:{
    type: Sequelize.STRING(40)
  },
  // usuario, empresa
  type:{
    type: Sequelize.STRING(20)
  },
  // información adicional sobre la persona o negocio
  details:{
    type: Sequelize.STRING
  },
  picture:{
    type: Sequelize.STRING(120)
  },
  phone:{
    type: Sequelize.STRING(20)
  },
  website:{
    type: Sequelize.STRING(150)
  },
  address:{
    type: Sequelize.STRING(170)
  },
  // información pública proveniente de las redes sociales
  data:{
    type: Sequelize.TEXT
  },
  lastLogin: {
    type: Sequelize.DATE,
    field:'last_login'
  }
}, {
  timestamps: true,
  paranoid: true,
  undescored:true,
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync().done(function (data) {
});

module.exports = User;
