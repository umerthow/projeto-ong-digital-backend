'use strict';

import BaseBusiness from '../../commons/base-business';
import DocsDao from './docs-dao';

export default class DocsBusiness extends BaseBusiness {
  constructor () {
    super();
    this._dao = new DocsDao();
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
      .then(super.notFound('Docs'))
      .then(result => result);
  }

  create (payload) {
    return this._dao.create(payload);
  }

  byId (options) {
    let id = options.params.id;
    return this._dao.byId(id, options)
      .then(super.notFound('Docs'));
  }

  update (options) {
    let id = options.params.id;
    let obj = options.payload;

    return this._dao.byId(id)
      .then(super.notFound('Docs'))
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
      .catch(super.notFound('Docs'));
  }
}
