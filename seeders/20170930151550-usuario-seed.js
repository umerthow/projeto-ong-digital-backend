'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuario', [
      {
        coduser: 1,
        nome: 'Rick',
        login: 'rick@c_137.com',
        senha: 'rick1234',
        funcao: 'Cientista',
        tipo_user: 'adm',
        status: 'Indefinido',
        dt_inclusao: '2017-09-30'
      },
      { 
        coduser: 2,
        nome: 'Morty',
        login: 'morty@c_137.com',
        senha: 'morty1234',
        funcao: 'Aprendiz',
        tipo_user: 'adm',
        status: 'Indefinido',
        dt_inclusao: '2017-09-30'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuario', null, {});
  }
};
