'use strict';

import Server from '../src/config/server';
import Config from '../src/config/environment';
import JWT from 'jsonwebtoken';
import Path from 'path';

import Dotenv from 'dotenv';
import Lab from 'lab';
import Chai from 'chai';

Dotenv.config({ path: Path.join(__dirname, '/.env'), silent: true });

const lab = exports.lab = Lab.script();

// chai plugins
Chai.use(require('chai-json-schema'));

// let expect = global.expect = chai.expect;
global.expect = Chai.expect;
global.should = Chai.should();

global.jsonSchemaError = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'definitions': {},
  'id': 'http://example.com/example.json',
  'properties': {
    'developerMessage': {
      'id': '/properties/developerMessage',
      'type': 'string'
    },
    'errorCode': {
      'id': '/properties/errorCode',
      'type': 'integer'
    },
    'moreInfo': {
      'id': '/properties/moreInfo',
      'type': 'string'
    },
    'userMessage': {
      'id': '/properties/userMessage',
      'type': 'string'
    }
  },
  'type': 'object'
};

// prepare environment
global.it = lab.it;
global.describe = lab.describe;
global.before = lab.before;
global.beforeEach = lab.beforeEach;

// get the server
global.server = Server;
global.db = global.server.database;
global.config = Config;

global.before({ timeout: 60000 }, (done) => {
  global.token = getToken(197775, '2');
  return done();
});

function getToken () {
  const secretKey = process.env.JWT || 'stubJWT';

  return JWT.sign({}, secretKey, {
    expiresIn: '8h'
  });
}
