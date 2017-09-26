'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('crianca', [{
      codcrianca: 1,
      nome: 'Luke Skywalker',
      rg: '123456',
      cpf: '357.217.638-76',
      cor: 'branca',
      sexo: 'masculino',
      dt_nascimento: '1999-01-01',
      escola_atual: 'Escola Scarabucci',
      codsituacao: 1,
      cpf_responsavel: '357.217.638-76',
      nome_responsavel: 'Maria das Dores',
      tel_responsavel: '(16) 99999-9999',
      dt_entrada: '1999-01-01',
      coduser: 1
    }, {
      codcrianca: 2,
      nome: 'Steven Tyler',
      rg: '123456',
      cpf: '357.217.638-76',
      cor: 'preta',
      sexo: 'feminino',
      dt_nascimento: '1999-01-01',
      escola_atual: 'Escola Scarabucci',
      codsituacao: 1,
      cpf_responsavel: '357.217.638-76',
      nome_responsavel: 'Maria das Dores',
      tel_responsavel: '(16) 99999-9999',
      dt_entrada: '1999-01-01',
      coduser: 1
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('crianca', null, {});
  }
};
