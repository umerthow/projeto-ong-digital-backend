'use strict';

import { sequelize } from '../../config/database';

const models = sequelize().models;
const model = models.child;

export default class ChildDao {
  findAll (options) {
    return model.findAll({
      include: options.includes,
      where: options.where,
      offset: options.paging.offset,
      limit: options.paging.limit
    });
  }

  create (obj) {
    return model.create(obj);
  }

  update (options) {
    return model.update(options.model, {
      where: options.where
    });
  }

  byId (id, options) {
    options = options || {};
    return model.findOne({
      include: options.includes,
      where: {
        id: id
      }
    });
  }

  delete (id, options) {
    options = options || {};
    return model.destroy({
      force: options.force,
      where: {
        id: id
      }
    });
  }
}
