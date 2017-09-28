'use strict';

import Controller from './childSituation-controller';
import * as Validator from './childSituation-schema';

exports.register = (server, options, next) => {
  const controller = new Controller();

  server.bind(controller);

  server.route([{
    method: 'GET',
    path: '/childrenSituation',
    handler: controller.list,
    config: {
      description: 'List children Situation',
      tags: ['api'],
      validate: Validator.list()
    }
  }, {
    method: 'POST',
    path: '/childrenSituation',
    handler: controller.create,
    config: {
      description: 'Create children Situation',
      tags: ['api'],
      validate: Validator.create()
    }
  }, {
    method: 'GET',
    path: '/childrenSituation/{id}',
    handler: controller.read,
    config: {
      description: 'Read children Situation by ID',
      tags: ['api'],
      validate: Validator.read()
    }
  }, {
    method: 'PUT',
    path: '/childrenSituation/{id}',
    handler: controller.update,
    config: {
      description: 'Update children Situation by ID',
      tags: ['api'],
      validate: Validator.update()
    }
  }, {
    method: 'DELETE',
    path: '/childrenSituation/{id}',
    handler: controller.remove,
    config: {
      description: 'Delete children Situation by ID',
      tags: ['api'],
      validate: Validator.remove()
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'childrenSituation-route',
  version: '1.0.0'
};
