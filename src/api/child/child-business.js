'use stric';
import BaseBusiness from '../../commons/base-business';
import { sequelize } from '../../config/database';
import ChildDao from './child-dao';
import ChildSituationBusiness from '../child_situation/childSituation-business';
import _ from 'lodash';

const models = sequelize().models;

export default class ChildBusiness extends BaseBusiness {
  constructor () {
    super();
    this._dao = new ChildDao();
    this._childSituationBusiness = new ChildSituationBusiness();
  }

  findAll (options) {
    const where = {};
    if (options.query.cpf) {
      where.cpf = options.query.cpf;
    }
    if (options.query.nome) {
      where.nome = options.query.nome;
    }
    if (options.query['status.id']) {
      where.codsituacao = options.query['status.id'];
    }

    return this._dao.findAll({
      paging: {
        limit: options.query.limit,
        offset: options.query.offset
      },
      where: where,
      includes: models.childSituation
    })
      .then(super.notFound('Child'))
      .then(val => {
        return this.buildResponse(val);
      });
  }

  create (options) {
    const obj = options.payload;
    obj.situation = obj.status.id;
    obj.codUser = obj.user.id;
    delete obj.status;

    return this._dao.create(obj)
    .then(child => {
      return this._childSituationBusiness.byId(null, obj.situation)
        .then(situation => {
          child.dataValues.childSituation = situation.dataValues;
          return this.buildResponse(child);
        });
    });
  }

  update (options) {
    let id = options.params.id;
    let obj = options.payload;
    obj.codsituacao = obj.status.id;
    return this._dao.byId(id)
      .then(super.notFound('Child'))
      .then(() => {
        return this._dao.update({
          model: obj,
          where: {
            id: id
          }
        });
      })
      .then(() => {
        return this.byId({
          params: {
            id: id
          },
          includes: [{
            model: models.childSituation
          }]
        });
      });
  }

  delete (options) {
    let id = options.params.id;
    return this._dao.byId(id)
      .then(super.notFound('Child'))
      .then(() => this._dao.delete(id, options));
  }

  byId (options) {
    let id = options.params.id;
    options.includes = models.childSituation;
    return this._dao.byId(id, options)
      .then(super.notFound('Child'))
      .then(val => {
        return this.buildResponse(val);
      });
  }

  buildResponse (entity) {
    let children = [];
    if (!(entity instanceof Array)) {
      entity = [entity];
    }

    _.forEach(entity, function (item) {
      let child = item.dataValues || item;
      let situation = item.dataValues.childSituation.dataValues || item.childSituation || item.dataValues.childSituation;

      delete child.codsituacao;
      delete child.situation;
      delete item.dataValues.childSituation;

      child.childSituation = situation;
      children.push(child);
    });

    return children;
  }

  buildFindOptions (query, where) {
    return {
      paging: {
        limit: (query) ? query.limit : 50,
        offset: (query) ? query.offset : 0
      },
      where: where || {},
      includes: models.squad
    };
  }
}
