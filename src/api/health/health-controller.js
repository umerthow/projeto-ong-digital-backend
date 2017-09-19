'use strict';

import HTTPStatus from 'http-status';

export default class HealthController {
  health (request, reply) {
    return reply({ status: 'health' }).code(HTTPStatus.OK);
  }

  ping (request, reply) {
    return reply({ status: 'pong' }).code(HTTPStatus.OK);
  }
}
