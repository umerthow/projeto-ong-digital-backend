/* global describe, it, expect, should, server, config, jsonSchemaError, token */
'use strict';

const jsonSchemaSuccess = {
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
          'birth': {
            'id': '/properties/records/items/properties/birth',
            'type': ['string', 'object']
          },
          'childSituation': {
            'id': '/properties/records/items/properties/childSituation',
            'properties': {
              'description': {
                'id': '/properties/records/items/properties/childSituation/properties/description',
                'type': 'string'
              },
              'id': {
                'id': '/properties/records/items/properties/childSituation/properties/id',
                'type': 'integer'
              }
            },
            'type': 'object'
          },
          'codUser': {
            'id': '/properties/records/items/properties/codUser',
            'type': 'integer'
          },
          'color': {
            'id': '/properties/records/items/properties/color',
            'type': 'string'
          },
          'cpf': {
            'id': '/properties/records/items/properties/cpf',
            'type': 'string'
          },
          'entryDate': {
            'id': '/properties/records/items/properties/entryDate',
            'type': ['string', 'object']
          },
          'id': {
            'id': '/properties/records/items/properties/id',
            'type': 'integer'
          },
          'name': {
            'id': '/properties/records/items/properties/name',
            'type': 'string'
          },
          'responsibleCpf': {
            'id': '/properties/records/items/properties/responsibleCpf',
            'type': 'string'
          },
          'responsibleName': {
            'id': '/properties/records/items/properties/responsibleName',
            'type': 'string'
          },
          'responsiblePhone': {
            'id': '/properties/records/items/properties/responsiblePhone',
            'type': 'string'
          },
          'rg': {
            'id': '/properties/records/items/properties/rg',
            'type': 'string'
          },
          'school': {
            'id': '/properties/records/items/properties/school',
            'type': 'string'
          },
          'sex': {
            'id': '/properties/records/items/properties/sex',
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

describe('Routes /children', () => {
  describe('GET /children', () => {
    describe('when children is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/children'
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
          url: config.routesPath + '/children/2',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        console.log(config.routesPath);
        server.inject(options, (response) => {
          let body = response.result;
          console.log(JSON.stringify(body));
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(1);
          expect(body.records[0]).to.have.property('id', 2);
          expect(body.records[0]).to.have.property('name', 'Steven Tyler');
          expect(body.records[0]).to.have.property('rg', '123456');
          expect(body.records[0]).to.have.property('cpf', '357.217.638-76');
          expect(body.records[0]).to.have.property('color', 'preta');
          expect(body.records[0]).to.have.property('sex', 'feminino');
          expect(body.records[0]).to.have.property('school', 'Escola Scarabucci');
          expect(body.records[0]).to.have.property('responsibleCpf', '357.217.638-76');
          expect(body.records[0]).to.have.property('responsibleName', 'Maria das Dores');
          expect(body.records[0]).to.have.property('responsiblePhone', '(16) 99999-9999');
          expect(body.records[0].childSituation).to.have.property('id', 1);
          expect(body.records[0].childSituation).to.have.property('description', 'Criança sob cuidados');

          done();
        });
      });
    });

    describe('when user is authenticated', () => {
      it('return 200 HTTP status code', (done) => {
        let options = {
          method: 'GET',
          url: config.routesPath + '/children',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        console.log(config.routesPath);
        server.inject(options, (response) => {
          let body = response.result;
          console.log(JSON.stringify(body));
          expect(response).to.have.property('statusCode', 200);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(2);
          expect(body.records[0]).to.have.property('id', 1);
          expect(body.records[0]).to.have.property('name', 'Luke Skywalker');
          expect(body.records[0]).to.have.property('rg', '123456');
          expect(body.records[0]).to.have.property('cpf', '357.217.638-76');
          expect(body.records[0]).to.have.property('color', 'branca');
          expect(body.records[0]).to.have.property('sex', 'masculino');
          expect(body.records[0]).to.have.property('school', 'Escola Scarabucci');
          expect(body.records[0]).to.have.property('responsibleCpf', '357.217.638-76');
          expect(body.records[0]).to.have.property('responsibleName', 'Maria das Dores');
          expect(body.records[0]).to.have.property('responsiblePhone', '(16) 99999-9999');
          expect(body.records[0].childSituation).to.have.property('id', 1);
          expect(body.records[0].childSituation).to.have.property('description', 'Criança sob cuidados');

          done();
        });
      });
    });
  });

  describe('POST /children', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/children',
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
          url: config.routesPath + '/children',
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

      it('return 400 HTTP status code when `name` is empty', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/children',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: ''
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

      it('return 201 HTTP status code when all data is correct', (done) => {
        let options = {
          method: 'POST',
          url: config.routesPath + '/children',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          payload: {
            name: 'string',
            status: {
              id: 1
            },
            rg: 'string',
            cpf: 'string',
            color: 'string',
            sex: 'string',
            birth: '2017-09-27',
            school: 'string',
            responsibleCpf: 'string',
            responsibleName: 'string',
            responsiblePhone: 'string',
            entryDate: '2017-09-27',
            exitDate: '2017-09-27',
            user: {
              id: 1
            }
          }
        };
        server.inject(options, (response) => {
          let body = response.result;
          console.log(body);
          expect(response).to.have.property('statusCode', 201);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaSuccess);
          expect(body.records).to.have.length.least(1);
          expect(body.meta.recordCount).to.have.least(1);
          expect(body.records[0]).to.have.property('id');
          expect(body.records[0]).to.have.property('name', 'string');
          done();
        });
      });
    });
  });

  describe('DELETE /children/{id}', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'DELETE',
          url: config.routesPath + '/children/1'
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
          url: config.routesPath + '/children/a',
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
          url: config.routesPath + '/children/99999',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };

        server.inject(options, (response) => {
          let body = response.result;
          expect(response).to.have.property('statusCode', 404);
          should.exist(body);
          expect(body).to.be.jsonSchema(jsonSchemaError);
          expect(body).to.have.property('developerMessage', 'Child not found');
          expect(body).to.have.property('userMessage', 'You attempted to get a Child, but did not find any');
          expect(body).to.have.property('errorCode', 20023);
          done();
        });
      });

      it('return 204 HTTP status code when record is deleted', (done) => {
        let options = {
          method: 'DELETE',
          url: config.routesPath + '/children/3',
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

  describe('PUT /childrenSituation/{id}', () => {
    describe('when user is not authenticated', () => {
      it('return 401 HTTP status code', (done) => {
        let options = {
          method: 'PUT',
          url: config.routesPath + '/children/1',
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
          url: config.routesPath + '/children/1',
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
          url: config.routesPath + '/children/1',
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
    });
  });
});
