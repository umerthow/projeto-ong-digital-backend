'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('user', {
      id: {
        field: 'id',
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        field: 'name',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      active: {
        field: 'active',
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 1
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('user');
  }
};
