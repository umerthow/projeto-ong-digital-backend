'use strict';

import BaseBusiness from '../../commons/base-business';
import ChildSituationDao from './childSituation-dao';

export default class ChildSituationBusiness extends BaseBusiness {
  constructor () {
    super();
    this._dao = new ChildSituationDao();
  }

  findAll (options) {
    let where = {};
    return this._dao.findAll({
      paging: {
        limit: options.query.limit,
        offset: options.query.offset
      },
      where: where
    })
      .then(super.notFound('Child Situation'))
      .then(result => result);
  }

  create (options) {
    let obj = options.payload;

    return this._dao.create(obj);
  }

  byId (options, id) {
    return this._dao.byId(id || options.params.id, options)
      .then(super.notFound('Child Situation'));
  }

  update (options) {
    let id = options.params.id;
    let obj = options.payload;

    return this._dao.byId(id)
      .then(super.notFound('Child Situation'))
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
      .then(super.notFound('Child Situation'))
      .then(() => this._dao.delete(id, options));
  }
}
