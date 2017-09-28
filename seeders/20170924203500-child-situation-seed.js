'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('situacao_crianca', [{
      codsituacao: 1,
      descricao: 'Criança sob cuidados'
    }, {
      codsituacao: 2,
      descricao: 'Criança retornou para os pais'
    }, {
      codsituacao: 3,
      descricao: 'Adulto desligado'
    }, {
      codsituacao: 4,
      descricao: 'Nova criança'
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('situacao_crianca', null, {});
  }
};
