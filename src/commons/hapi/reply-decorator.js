'use strict';

import JoiErrorParser from '../joi-error-parser';

import apigeeResponseSuccess from '../response-success-parser';
const version = '0.0.5';

let success = function (data, options) {
  return this.response(apigeeResponseSuccess(data, options));
};

const register = (server, options, next) => {
  server.ext('onPreResponse', (request, reply) => {
    let error = request.response;
    if (error.isBoom) {
      let newResponse = {};
      if (error.data && error.data.details) {
        newResponse = JoiErrorParser.buildJoiError(error);
      } else {
        newResponse = JoiErrorParser.buildGenericErrors(error);
      }
      return reply(newResponse.body).code(newResponse.statusCode);
    }
    return reply.continue();
  });

  server.decorate('reply', 'success', success);

  next();
};

register.attributes = {
  name: 'response-decorators',
  version: version
};

export default register;
