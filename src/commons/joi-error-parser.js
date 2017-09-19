'use strict';

import errorParser from './error-parser';
import __joiToErrorCatalog from './joi-error-catalog';

let parsePath = path => {
  let result = path;
  let arrayIndexes = path.match(/(^\d{1,}[.])|([.]\d{1,}[.])|([.]\d{1,}$)/g);
  if (arrayIndexes && arrayIndexes.length > 0) {
    arrayIndexes.forEach(index => {
      let indexPosition = index.substring(0, 1) === '.' ? (index.substring(index.length - 1, index.length) === '.' ? 'inner' : 'end') : 'begin';
      let indexParsed = '';
      if (indexPosition === 'begin') {
        indexParsed = '[' + index.substring(0, index.length - 1) + '].';
      } else if (indexPosition === 'inner') {
        indexParsed = '[' + index.substring(1, index.length - 1) + '].';
      } else if (indexPosition === 'end') {
        indexParsed = '[' + index.substring(1, index.length) + ']';
      }
      result = result.split(index).join(indexParsed);
    });
  }
  return result;
};

let buildJoiError = error => {
  let errorDetails = error.data.details;
  let parameterPath = parsePath(errorDetails[0].path);

  let parameterType = error.output.payload.validation.source;
  if (parameterType === 'params') {
    parameterType = 'path';
  }

  if (parameterType === 'payload') {
    parameterType = 'body';
  }

  let errorType = errorDetails[0].type;

  /**
   * Tratamento para o error type date.isoDate, seguindo a convenção ISO-8601
   */
  if (errorType === 'object.and') {
    parameterPath = errorDetails[0].context.missing;
  }

  let joiError = __joiToErrorCatalog[errorType];
  if (!joiError) {
    return errorParser(10000, '- Error code not found for joi error ' + errorType);
  }

  let parameters = joiError.parameters(errorDetails[0], [parameterType, parameterPath]);

  return errorParser(joiError.code, parameters);
};

let buildGenericErrors = error => {
  if (error.output.statusCode === 401) {
    return errorParser(30001, 'make sure the header parameter Authorization is valid');
  }

  return errorParser(10000, '- Error code not found for joi error ' + error.output.payload.message);
};

export default {buildJoiError, buildGenericErrors};
