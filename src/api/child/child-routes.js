'use strict';

import Controller from './child-controller';
import * as Validator from './child-schema';

exports.register = (server, options, next) => {
  const controller = new Controller();

  server.bind(controller);

  server.route([{
    method: 'GET',
    path: '/children',
    handler: controller.list,
    config: {
      description: 'List children',
      tags: ['api'],
      validate: Validator.list()
    }
  }, {
    method: 'GET',
    path: '/children/{id}',
    handler: controller.read,
    config: {
      description: 'Read children by ID',
      tags: ['api'],
      validate: Validator.read()
    }
  }, {
    method: 'POST',
    path: '/children',
    handler: controller.create,
    config: {
      description: 'Create children',
      tags: ['api'],
      validate: Validator.create()
    }
  }, {
    method: 'PUT',
    path: '/children/{id}',
    handler: controller.update,
    config: {
      description: 'Update children by ID',
      tags: ['api'],
      validate: Validator.update()
    }
  }, {
    method: 'DELETE',
    path: '/children/{id}',
    handler: controller.remove,
    config: {
      description: 'Delete children by ID',
      tags: ['api'],
      validate: Validator.remove()
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'children-route',
  version: '1.0.0'
};
