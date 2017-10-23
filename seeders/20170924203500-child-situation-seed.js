'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('situacao_crianca', [{
      descricao: 'Criança sob cuidados'
    }, {
      descricao: 'Criança retornou para os pais'
    }, {
      descricao: 'Adulto desligado'
    }, {
      descricao: 'Nova criança'
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('situacao_crianca', null, {});
  }
};
