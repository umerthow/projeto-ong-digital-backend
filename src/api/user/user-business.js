'use strict';

import BaseBusiness from '../../commons/base-business';
import UserDao from './user-dao';

export default class UserBusiness extends BaseBusiness {
  constructor () {
    super();
    this._dao = new UserDao();
  }

  findAll (options) {
    let where = options.where || {};

    return this._dao.findAll({
      paging: {
        limit: options.query.limit,
        offset: options.query.offset
      },
      where
    })
      .then(super.notFound('Users'))
      .then(result => result);
  }

  create (options) {
    let obj = options.payload;

    return this._dao.create(obj);
  }

  byId (options) {
    let id = options.params.id;
    return this._dao.byId(id, options)
      .then(super.notFound('User'));
  }

  update (options) {
    let id = options.params.id;
    let obj = options.payload;

    return this._dao.byId(id)
      .then(super.notFound('User'))
      .then(() => {
        return this._dao.update({
          model: obj,
          where: {
            id: id
          }
        });
      })
      .then(() => this._dao.byId(id));
  }

  delete (options) {
    let id = options.params.id;
    return this._dao.byId(id)
      .then(this._dao.delete(id, options))
      .catch(super.notFound('User'));
  }
}
