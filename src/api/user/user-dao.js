'use strict';

import { sequelize } from '../../config/database';

const models = sequelize().models;
const user = models.user;

export default class UserDao {
  findAll (options) {
    return user.findAll({
      attributes: ['id', 'name', 'user', 'func', 'privilegy', 'status', 'entryDate', 'updatedAt'],
      where: options.where,
      offset: options.paging.offset,
      limit: options.paging.limit
    });
  }

  create (obj) {
    return user.create(obj);
  }

  update (options) {
    return user.update(options.model, {
      where: options.where
    });
  }

  findOne (options) {
    return user.findOne(options);
  }

  byId (id, options) {
    return user.findOne({
      where: {
        id: id
      }
    });
  }

  delete (id, options) {
    return user.destroy({
      force: options.force,
      where: {
        id: id
      }
    });
  }
}
