'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('situacao_crianca', {
      id: {
        field: 'codsituacao',
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        field: 'descricao',
        type: Sequelize.STRING(200),
        allowNull: false
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('situacao_crianca');
  }
};
