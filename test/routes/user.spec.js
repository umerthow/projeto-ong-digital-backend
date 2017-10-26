/* global describe, it, expect, should, server, config, jsonSchemaError, token */
'use strict';

var jsonSchemaSuccess = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'definitions': {},
  'id': 'http://example.com/example.json',
  'properties': {
    'meta': {
      'id': '/properties/meta',
      'properties': {
        'limit': {
          'id': '/properties/meta/properties/limit',
          'type': 'integer'
        },
        'offset': {
          'id': '/properties/meta/properties/offset',
          'type': 'integer'
        },
        'recordCount': {
          'id': '/properties/meta/properties/recordCount',
          'type': 'integer'
        },
        'server': {
          'id': '/properties/meta/properties/server',
          'type': 'string'
        }
      },
      'type': 'object'
    },
    'records': {
      'id': '/properties/records',
      'items': {
        'id': '/properties/records/items',
        'properties': {
          'active': {
            'id': '/properties/records/items/properties/active',
            'type': 'boolean'
          },
          'id': {
            'id': '/properties/records/items/properties/id',
            'type': 'integer'
          },
          'name': {
            'id': '/properties/records/items/properties/name',
            'type': 'string'
          }
        },
        'type': 'object'
      },
      'type': 'array'
    }
  },
  'type': 'object'
};

describe('Routes /users', () => {
  describe('GET /users', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users'
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 401);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Unauthorized - make sure the header parameter Authorization is valid');
          expect(body).to.have.property('userMessage', 'You are not authorized to perform this operation');
          expect(body).to.have.property('errorCode', 30001);
          done();
        });
      });
    });

    describe('when user is authenticated', () => {
      it('return 200 HTTP status code', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(2);
          expect(body.meta.recordCount).to.have.least(2);
          expect(body.records[0]).to.have.property('id', 1);
          expect(body.records[0]).to.have.property('name', 'Rick');
          done();
        });
      });

      it('return 200 HTTP status code with offset', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?offset=2',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(2);
          expect(body.meta.recordCount).to.have.least(2);
          done();
        });
      });

      it('return 200 HTTP status code and 2 results only with limit equal a 2', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?limit=2',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(2);
          expect(body.meta.recordCount).to.have.least(2);
          done();
        });
      });

      it('return 200 HTTP status code with offset and limit', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?offset=2&limit=1',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(1);
          expect(body.meta.recordCount).to.have.least(1);
          done();
        });
      });

      it('return 400 HTTP status code with limit invalid number greater than 50', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?limit=200',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid query parameter limit - it must be filled with a value lesser or equals than 50');
          expect(body).to.have.property('userMessage', 'Invalid field limit - it must be filled with a value lesser or equals than 50');
          expect(body).to.have.property('errorCode', 20088);
          done();
        });
      });

      it('return 400 HTTP status code with offset invalid number', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?offset=a',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid query parameter offset - it must be filled with a valid number');
          expect(body).to.have.property('userMessage', 'Invalid field offset - it must be filled with a valid number');
          expect(body).to.have.property('errorCode', 20007);
          done();
        });
      });

      it('return 400 HTTP status code with limit invalid number', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?limit=a',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid query parameter limit - it must be filled with a valid number');
          expect(body).to.have.property('userMessage', 'Invalid field limit - it must be filled with a valid number');
          expect(body).to.have.property('errorCode', 20007);
          done();
        });
      });

      it('return 400 HTTP status code with offset less than zero', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?offset=-1',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid query parameter offset - it must be filled with a value greater or equals than 0');
          expect(body).to.have.property('userMessage', 'Invalid field offset - it must be filled with a value greater or equals than 0');
          expect(body).to.have.property('errorCode', 20087);
          done();
        });
      });

      it('return 400 HTTP status code with limit less than one', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users?limit=0',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid query parameter limit - it must be filled with a value greater or equals than 1');
          expect(body).to.have.property('userMessage', 'Invalid field limit - it must be filled with a value greater or equals than 1');
          expect(body).to.have.property('errorCode', 20087);
          done();
        });
      });
    });
  });

  describe('GET /users/{id}', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users/1'
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 401);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Unauthorized - make sure the header parameter Authorization is valid');
          expect(body).to.have.property('userMessage', 'You are not authorized to perform this operation');
          expect(body).to.have.property('errorCode', 30001);
          done();
        });
      });
    });

    describe('when user is authenticated', () => {
      it('return 200 HTTP status code', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users/1',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(1);
          expect(body.meta.recordCount).to.have.least(1);
          expect(body.records[0]).to.have.property('id', 1);
          expect(body.records[0]).to.have.property('name', 'Rick');
          done();
        });
      });

      it('return 400 HTTP status code when the specified id is invalid', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users/a',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid path parameter id - it must be filled with a valid number');
          expect(body).to.have.property('userMessage', 'Invalid field id - it must be filled with a valid number');
          expect(body).to.have.property('errorCode', 20007);
          done();
        });
      });

      it('return 404 HTTP status code when the specified id is not found', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/users/99999',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 404);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'User not found');
          expect(body).to.have.property('userMessage', 'You attempted to get a User, but did not find any');
          expect(body).to.have.property('errorCode', 20023);
          done();
        });
      });
    });
  });

  describe('POST /users', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/users',
          payload: {}
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 401);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Unauthorized - make sure the header parameter Authorization is valid');
          expect(body).to.have.property('userMessage', 'You are not authorized to perform this operation');
          expect(body).to.have.property('errorCode', 30001);
          done();
        });
      });
    });

    describe('when user is authenticated', () => {
      it('return 400 HTTP status code when no body is sended', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/users',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Missing request body');
          expect(body).to.have.property('userMessage', 'Missing request body');
          expect(body).to.have.property('errorCode', 20019);
          done();
        });
      });

      it('return 400 HTTP status code when no `name` is send', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/users',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Missing body parameter name');
          expect(body).to.have.property('userMessage', 'Field name is required and can not be empty');
          expect(body).to.have.property('errorCode', 20001);
          done();
        });
      });

      it('return 400 HTTP status code when `name` is empty', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/users',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: '',
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Missing body parameter name');
          expect(body).to.have.property('userMessage', 'Field name is required and can not be empty');
          expect(body).to.have.property('errorCode', 20001);
          done();
        });
      });

      it('return 400 HTTP status code when `name` isn\'t a string', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/users',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: 0,
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid body parameter name - it must be filled with a valid string');
          expect(body).to.have.property('userMessage', 'Invalid field name - it must be filled with a valid string');
          expect(body).to.have.property('errorCode', 20003);
          done();
        });
      });

      it('return 201 HTTP status code when all data is correct', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/users',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: 'Robson dos Teclados',
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 201);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(1);
          expect(body.meta.recordCount).to.have.least(1);
          expect(body.records[0]).to.have.property('id');
          expect(body.records[0]).to.have.property('name', 'Robson dos Teclados');
          done();
        });
      });
    });
  });

  describe('PUT /users/{id}', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/1',
          payload: {}
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 401);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Unauthorized - make sure the header parameter Authorization is valid');
          expect(body).to.have.property('userMessage', 'You are not authorized to perform this operation');
          expect(body).to.have.property('errorCode', 30001);
          done();
        });
      });
    });

    describe('when user is authenticated', () => {
      it('return 400 HTTP status code when no body is sended', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/1',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Missing request body');
          expect(body).to.have.property('userMessage', 'Missing request body');
          expect(body).to.have.property('errorCode', 20019);
          done();
        });
      });

      it('return 400 HTTP status code when no `name` is send', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/1',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {}
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Missing body parameter name');
          expect(body).to.have.property('userMessage', 'Field name is required and can not be empty');
          expect(body).to.have.property('errorCode', 20001);
          done();
        });
      });

      it('return 400 HTTP status code when `name` is empty', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/1',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: '',
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Missing body parameter name');
          expect(body).to.have.property('userMessage', 'Field name is required and can not be empty');
          expect(body).to.have.property('errorCode', 20001);
          done();
        });
      });

      it('return 400 HTTP status code when `name` isn\'t a string', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/1',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: 0,
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid body parameter name - it must be filled with a valid string');
          expect(body).to.have.property('userMessage', 'Invalid field name - it must be filled with a valid string');
          expect(body).to.have.property('errorCode', 20003);
          done();
        });
      });

      it('return 400 HTTP status code when the specified id is invalid', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/a',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: 'name Test',
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid path parameter id - it must be filled with a valid number');
          expect(body).to.have.property('userMessage', 'Invalid field id - it must be filled with a valid number');
          expect(body).to.have.property('errorCode', 20007);
          done();
        });
      });

      it('return 404 HTTP status code when the specified id is not found', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/99999',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: 'name Test',
            user: 'blabla@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 404);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'User not found');
          expect(body).to.have.property('userMessage', 'You attempted to get a User, but did not find any');
          expect(body).to.have.property('errorCode', 20023);
          done();
        });
      });

      it('return 200 HTTP status code when all data is correct', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/users/1',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: 'Naruto',
            user: 'naruto@bla.com',
            pass: 'abracadabra',
            func: 'tester',
            privilegy: 'adm',
            status: 'undefined',
            entryDate: '2017-10-05T16:03:56.000Z'
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(1);
          expect(body.meta.recordCount).to.have.least(1);
          expect(body.records[0]).to.have.property('id');
          expect(body.records[0]).to.have.property('name', 'Naruto');
          done();
        });
      });
    });
  });

  describe('DELETE /users/{id}', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'DELETE',
          url: config.routesPath + '/users/1'
        };
        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 401);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Unauthorized - make sure the header parameter Authorization is valid');
          expect(body).to.have.property('userMessage', 'You are not authorized to perform this operation');
          expect(body).to.have.property('errorCode', 30001);
          done();
        });
      });
    });

    describe('when user is authenticated', () => {
      it('return 400 HTTP status code when the specified id is invalid', (done) => {
        let options = {
          method: 'DELETE',
          url: config.routesPath + '/users/a',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 400);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Invalid path parameter id - it must be filled with a valid number');
          expect(body).to.have.property('userMessage', 'Invalid field id - it must be filled with a valid number');
          expect(body).to.have.property('errorCode', 20007);
          done();
        });
      });

      it('return 404 HTTP status code when the specified id is not found', (done) => {
        let options = {
          method: 'DELETE',
          url: config.routesPath + '/users/99999',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 404);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'User not found');
          expect(body).to.have.property('userMessage', 'You attempted to get a User, but did not find any');
          expect(body).to.have.property('errorCode', 20023);
          done();
        });
      });

      it('return 204 HTTP status code when record is deleted', (done) => {
        let options = {
          method: 'DELETE',
          url: config.routesPath + '/users/1',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        server.inject(options, (response) => {
          expect(response).to.have.property('statusCode', 204);
          expect(response).to.have.property('result');
          expect(response.result).to.be.a('null');
          done();
        });
      });
    });
  });
});
