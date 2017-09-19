'use strict';

import JWT from 'hapi-auth-jwt2';
const version = '0.0.5';

const register = (server, options, next) => {
  server.register(JWT, registerAuth);

  function registerAuth (err) {
    if (err) {
      return next(err);
    }

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT || 'stubJWT',
      validateFunc: options.validateFunc,
      verifyOptions: {
        algorithms: ['HS256']
      }
    });

    server.auth.default('jwt');

    return next();
  }
};

register.attributes = {
  name: 'auth-jwt',
  version: version
};

export default register;
