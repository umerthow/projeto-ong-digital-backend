'use strict';

import Controller from './health-controller';

exports.register = (server, options, next) => {
  const controller = new Controller();

  server.bind(controller);

  server.route([
    {
      method: 'GET',
      path: '/health',
      config: {
        auth: false,
        description: 'Heath check',
        tags: ['api'],
        handler: controller.health
      }
    },
    {
      method: 'GET',
      path: '/health/ping',
      config: {
        auth: false,
        description: 'Ping/Pong',
        tags: ['api'],
        handler: controller.ping
      }
    }]);
  next();
};

exports.register.attributes = {
  name: 'health-route',
  version: '1.0.0'
};
