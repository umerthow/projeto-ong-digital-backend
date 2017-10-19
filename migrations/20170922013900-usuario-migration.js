'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('usuario', {
      id: {
        field: 'coduser',
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        field: 'nome',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      user: {
        field: 'login',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      pass: {
        field: 'senha',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      func: {
        field: 'funcao',
        type: Sequelize.STRING(200),
        allowNull: true
      },
      privilegy: {
        field: 'tipo_user',
        type: Sequelize.STRING(20),
        allowNull: false
      },
      status: {
        field: 'status',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      entryDate: {
        field: 'dt_inclusao',
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        field: 'dt_ult_alteracao',
        type: Sequelize.DATE(3),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)')
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuario');
  }
};
