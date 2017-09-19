'use strict';

import _ from 'lodash';

export default class BaseBusiness {
  notFound (parameters) {
    return entity => {
      if (_.isEmpty(entity)) {
        let error = new Error();
        error.errorCode = 20023;
        error.parameters = parameters;
        throw error;
      }

      return entity;
    };
  }
}
