'use strict';

import BaseController from '../../commons/base-controller';
import HTTPStatus from 'http-status';
import ChildBusiness from './child-business';
import _ from 'lodash';

export default class ChildController extends BaseController {
  constructor () {
    super();
    this._business = new ChildBusiness();
  }

  buildResponse () {
    return (entity) => {
      return entity;
    };
  }

  list (request, reply) {
    const options = {
      headers: _.cloneDeep(request.headers),
      query: _.cloneDeep(request.query)
    };

    return this._business.findAll(options)
      .then(this.buildResponse())
      .then((response) => reply.success(response, options).code(HTTPStatus.OK))
      .catch(super.error(reply));
  }

  create (request, reply) {
    const options = {
      headers: _.cloneDeep(request.headers),
      payload: _.cloneDeep(request.payload)
    };

    return this._business.create(options)
      .then(this.buildResponse())
      .then((response) => reply.success(response, options).code(HTTPStatus.CREATED))
      .catch(super.error(reply));
  }

  update (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      params: _.cloneDeep(request.params),
      payload: _.cloneDeep(request.payload)
    };

    return this._business.update(options)
      .then(this.buildResponse())
      .then((response) => reply.success(response, options).code(HTTPStatus.OK))
      .catch((error) => {
        console.log(error);
        super.error(reply);
      });
  }

  remove (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      params: _.cloneDeep(request.params)
    };

    return this._business.delete(options)
      .then((response) => reply.success(response, options).code(HTTPStatus.NO_CONTENT))
      .catch(super.error(reply));
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
}
