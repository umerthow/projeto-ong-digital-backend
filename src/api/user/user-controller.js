'use strict';

import BaseController from '../../commons/base-controller';
import HTTPStatus from 'http-status';
import Business from './user-business';
import sha256 from 'crypto-js/sha256';
import _ from 'lodash';

export default class UserController extends BaseController {
  constructor () {
    super();
    this._business = new Business();
  }

  buildResponse () {
    return (entity) => {
      return entity;
    };
  }

  list (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      query: _.cloneDeep(request.query)
    };

    return this._business.findAll(options)
      .then(this.buildResponse())
      .then((response) => reply.success(response, options).code(HTTPStatus.OK))
      .catch(super.error(reply));
  }

  create (request, reply) {
    let { user, pass } = request.payload;
    request.payload.pass = sha256(pass).toString();

    let options = {
      headers: _.cloneDeep(request.headers),
      payload: _.cloneDeep(request.payload)
    };
    
    let createRecord = (options) => {
      return this._business.create(options)
        .then(this.buildResponse())
        .then((response) => reply.success(response, options).code(HTTPStatus.CREATED))
        .catch(super.error(reply));
    };
    
    this._business.findUser({ user })
      .then((rows) => {
        if (rows.length >= 1) {
          return reply(HTTPStatus[409]).code(HTTPStatus.CONFLICT);
        } else {
          createRecord(options);
        }
      })
      .catch(() => {
        createRecord(options);
      });
  }

  read (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      params: _.cloneDeep(request.params)
    };

    return this._business.byId(options)
      .then(this.buildResponse())
      .then((response) => reply.success(response, options).code(HTTPStatus.OK))
      .catch(super.error(reply));
  }

  update (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      params: _.cloneDeep(request.params),
      payload: _.cloneDeep(request.payload)
    };

    let verifyUser = (options) => {
      return new Promise((resolve) => {
        let id = request.params.id;
        
        return this._business.findUser({ id })
          .then((rows) => {
            if (rows.length >= 1) {
              resolve(true);
            } else {
              reslve(false);
            }
          })
          .catch((err) => {
            resolve(false);
          });  
      });
    }
    
    let updateRecord = (options) => {
      return this._business.update(options)
        .then(this.buildResponse())
        .then((response) => reply.success(response, options).code(HTTPStatus.OK))
        .catch(super.error(reply));
    };
    
    verifyUser(options)
      .then((exists) => {
        if (!exists) {
          return reply(HTTPStatus[404]).code(HTTPStatus.NOT_FOUND);
        } else {
          if (request.payload.pass) {
            options.payload.pass = sha256(request.payload.pass).toString();
          }

          if (request.payload.user) {
            let user = request.payload.user;
            let id = request.params.id;

            this._business.findUser({ 
              user,
              id: {
                $ne: id
              }
            })
              .then((rows) => {
                if (rows.length >= 1) {
                  return reply(HTTPStatus[409]).code(HTTPStatus.CONFLICT);
                } else {
                  updateRecord(options);
                }
              })
              .catch((err) => {
                updateRecord(options);
              });
          } else {
            updateRecord(options);
          }
        }
      });
  }

  remove (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      params: _.cloneDeep(request.params)
    };
    
    let verifyUser = (options) => {
      return new Promise((resolve) => {
        let id = request.params.id;
        
        return this._business.findUser({ id })
          .then((rows) => {
            if (rows.length >= 1) {
              resolve(true);
            } else {
              reslve(false);
            }
          })
          .catch((err) => {
            resolve(false);
          });  
      });
    }
    
    let deleteUser = (options) => {
      return this._business.delete(options)
        .then((response) => reply.success(response, options).code(HTTPStatus.NO_CONTENT))
        .catch((err) => {
          console.log(err);
          super.error(reply);
        });
    }
    
    verifyUser(options)
      .then((exists) => {
        if (!exists) {
          return reply(HTTPStatus[404]).code(HTTPStatus.NOT_FOUND);
        } else {
          deleteUser(options);
        }
      })
      .catch((err) => {
        console.log('Error at verifyUser');
        console.log(err);
      });
  }
}
