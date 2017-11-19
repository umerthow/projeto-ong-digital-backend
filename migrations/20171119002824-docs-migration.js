'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('documentos', { 
      id: {
        field: "coddocumento",
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
      tags: {
        field: 'tags',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      fileid: {
        field: 'fileid',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      user: {
        field: 'coduser',
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          key: 'coduser',
          model: 'usuario'
        }
      },
      child: {
        field: 'codcrianca',
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
          key: 'codcrianca',
          model: 'crianca'
        }
      },
      entryDate: {
        field: 'dt_inclusao',
        type: Sequelize.DATE(3),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      },
      updatedAt: {
        field: 'dt_ult_alteracao',
        type: Sequelize.DATE(3),
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('documentos');
  }
};
