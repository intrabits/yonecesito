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
    type: Sequelize.STRING(30)
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
