'use strict';

import errorParser from './error-parser';

export default class BaseController {
  buildResponse () {
    return () => {
      throw new Error('buildResponse method should be override on controller');
    };
  }

  error (reply) {
    return err => {
      if (!err.errorCode) {
        err.errorCode = 10000;
        err.parameters = undefined;
      }

      let errorMessage = errorParser(err.errorCode, err.parameters);
      return reply(errorMessage.body)
        .code(errorMessage.statusCode);
    };
  }
}
