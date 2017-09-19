'use strict';

import Inert from 'inert';
import Vision from 'vision';
import HapiSwaggered from 'hapi-swaggered';
import HapiSwaggeredUI from 'hapi-swaggered-ui';
const version = '0.0.5';

const register = (server, options, next) => {
  const optsSwaggered = {
    stripPrefix: options.config.routesPath,
    tags: options.tags,
    info: options.info,
    auth: false
  };

  const optsSwaggeredUI = {
    title: options.title,
    path: '/docs',
    authorization: {
      field: 'authorization',
      scope: 'header', // header works as well
      placeholder: 'Enter your token here'
    },
    swaggerOptions: {
      validatorUrl: null
    },
    auth: false
  };

  server.register([
    Inert,
    Vision, {
      register: HapiSwaggered,
      options: optsSwaggered
    }, {
      register: HapiSwaggeredUI,
      options: optsSwaggeredUI
    }
  ], err => {
    return next(err);
  });

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: function (request, reply) {
        reply.redirect('/docs');
      }
    }
  });
};

register.attributes = {
  name: 'documentation',
  version: version
};

export default register;
