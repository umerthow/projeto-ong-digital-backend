'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('crianca', {
      id: {
        field: 'codcrianca',
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
      rg: {
        field: 'rg',
        type: Sequelize.STRING(20),
        allowNull: false
      },
      cpf: {
        field: 'cpf',
        type: Sequelize.STRING(15),
        allowNull: false
      },
      color: {
        field: 'cor',
        type: Sequelize.STRING(10),
        allowNull: false
      },
      sex: {
        field: 'sexo',
        type: Sequelize.STRING(10),
        allowNull: false
      },
      birth: {
        field: 'dt_nascimento',
        type: Sequelize.DATE,
        allowNull: false
      },
      school: {
        field: 'escola_atual',
        type: Sequelize.STRING(200),
        allowNull: false
      },
      situation: {
        field: 'codsituacao',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'codsituacao',
          model: 'situacao_crianca'
        }
      },
      responsibleCpf: {
        field: 'cpf_responsavel',
        type: Sequelize.STRING(15),
        allowNull: true
      },
      responsibleName: {
        field: 'nome_responsavel',
        type: Sequelize.STRING(200),
        allowNull: true
      },
      responsiblePhone: {
        field: 'tel_responsavel',
        type: Sequelize.STRING(15),
        allowNull: true
      },
      entryDate: {
        field: 'dt_entrada',
        type: Sequelize.DATE,
        allowNull: false
      },
      exitDate: {
        field: 'dt_desligamento',
        type: Sequelize.DATE,
        allowNull: true
      },
      codUser: {
        field: 'coduser',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'coduser',
          model: 'usuario'
        }
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('crianca');
  }
};
