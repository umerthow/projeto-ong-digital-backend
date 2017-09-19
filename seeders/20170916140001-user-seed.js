'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [{
      id: 1,
      name: 'Darth Vader',
      active: true
    }, {
      id: 2,
      name: 'Jim Morrison',
      active: true
    }, {
      id: 3,
      name: 'Mick Jagger',
      active: true
    }, {
      id: 4,
      name: 'Jimmy Page',
      active: true
    }, {
      id: 5,
      name: 'Eric Clapton',
      active: true
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  }
};
