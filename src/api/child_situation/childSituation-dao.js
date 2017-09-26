'use strict';

import { sequelize } from '../../config/database';

const models = sequelize().models;
const childSituation = models.childSituation;

export default class ChildSituationDao {
  findAll (options) {
    return childSituation.findAll({
      where: options.where,
      offset: options.paging.offset,
      limit: options.paging.limit
    });
  }

  create (obj) {
    return childSituation.create(obj);
  }

  update (options) {
    return childSituation.update(options.model, {
      where: options.where
    });
  }

  findOne (options) {
    return childSituation.findOne(options);
  }

  byId (id, options) {
    return childSituation.findOne({
      where: {
        id: id
      }
    });
  }

  delete (id, options) {
    return childSituation.destroy({
      force: options.force,
      where: {
        id: id
      }
    });
  }
}
