'use strict';

import {clearJson} from './json-helpers';

export default function success (data, options) {
  options = options || {};
  options.query = options.query || {};
  let responseBody = {};
  data = data instanceof Array ? data : [data];
  data = data.map(each => each.toJSON ? each.toJSON() : each);
  responseBody.meta = {
    server: require('os').hostname(),
    offset: options.offset || options.query.offset || 0,
    limit: options.limit || options.query.limit || 50,
    recordCount: data.length
  };
  responseBody.records = data;
  clearJson(responseBody);

  return responseBody;
}
