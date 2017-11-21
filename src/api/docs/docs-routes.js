'use strict';

import Controller from './docs-controller';
import * as Validator from './docs-schema';

exports.register = (server, options, next) => {
  const controller = new Controller();

  server.bind(controller);

  server.route([{
    method: 'GET',
    path: '/docs',
    handler: controller.list,
    config: {
      description: 'List docs',
      tags: ['api'],
      validate: Validator.list()
    }
  }, {
    method: 'POST',
    path: '/docs',
    handler: controller.create,
    config: {
      description: 'Create doc',
      tags: ['api']
    }
  }, {
    method: 'GET',
    path: '/docs/{id}',
    handler: controller.read,
    config: {
      description: 'Read doc by ID',
      tags: ['api'],
      validate: Validator.read()
    }
  }, {
    method: 'PUT',
    path: '/docs/{id}',
    handler: controller.update,
    config: {
      description: 'Update doc by ID',
      tags: ['api'],
      validate: Validator.update()
    }
  }, {
    method: 'DELETE',
    path: '/docs/{id}',
    handler: controller.remove,
    config: {
      description: 'Delete doc by ID',
      tags: ['api'],
      validate: Validator.remove()
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'docs-route',
  version: '1.0.0'
};
