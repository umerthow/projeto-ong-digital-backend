'use strict';

import Controller from './user-controller';
import * as Validator from './user-schema';

exports.register = (server, options, next) => {
  const controller = new Controller();

  server.bind(controller);

  server.route([{
    method: 'GET',
    path: '/users',
    handler: controller.list,
    config: {
      description: 'List users',
      tags: ['api'],
      validate: Validator.list()
    }
  }, {
    method: 'POST',
    path: '/users',
    handler: controller.create,
    config: {
      description: 'Create user',
      tags: ['api'],
      validate: Validator.create()
    }
  }, {
    method: 'GET',
    path: '/users/{id}',
    handler: controller.read,
    config: {
      description: 'Read user by ID',
      tags: ['api'],
      validate: Validator.read()
    }
  }, {
    method: 'PUT',
    path: '/users/{id}',
    handler: controller.update,
    config: {
      description: 'Update user by ID',
      tags: ['api'],
      validate: Validator.update()
    }
  }, {
    method: 'DELETE',
    path: '/users/{id}',
    handler: controller.remove,
    config: {
      description: 'Delete user by ID',
      tags: ['api'],
      validate: Validator.remove()
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'users-route',
  version: '1.0.0'
};
