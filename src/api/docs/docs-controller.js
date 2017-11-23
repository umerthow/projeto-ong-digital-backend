'use strict';

import BaseController from '../../commons/base-controller';
import HTTPStatus from 'http-status';
import Business from './docs-business';
import FileType from 'file-type';
import google from 'googleapis';
import { gapi } from './gapi';
import _ from 'lodash';
import fs from 'fs';

export default class DocsController extends BaseController {
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
    let drive = null;
    const data = request.payload;
    const allowed = ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'];

    const file = {
      data: data.file,
      info: FileType(data.file) || { mime: false }
    };

    const options = {
      headers: _.cloneDeep(request.headers),
      payload: _.cloneDeep(request.payload)
    };

    let uploadFile = (drive, data, file) => {
      return new Promise((resolve) => {
        drive.files.insert({
          resource: {
            title: data.name,
            mimeType: file.info.mime
          },
          media: {
            mimeType: file.info.mime,
            body: file.data
          }
        }, (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject({ errorCode: '20091', parameters: err });
          }
        });
      });
    };

    let newDocument = async function(data, file, cb) {
      try {
        const auth = await gapi();
        drive = google.drive({ version: 'v2', auth: auth });

        let uploadedFile = await uploadFile(drive, data, file);

        cb(null, uploadedFile);
      } catch (err) {
        cb(err);
      }
    };

    if (allowed.includes(file.info.mime)) {
      newDocument(data, file, (err, res) => {
        if (err) {
          return super.error(reply)(err);
        }

        this._business.create({
          name: data.name,
          tags: data.tags,
          fileid: res.id,
          user: data.usuario,
          child: data.crianca
        })
          .then(this.buildResponse())
          .then((r) => reply.success(r, options).code(HTTPStatus.CREATED))
          .catch((err) => {

            drive.files.delete({
              fileId: res.id
            }, (e, r, b) => {
              if (!e && b.statusCode == 204) {
                return super.error(reply)(err);
              }

              return super.error(reply)({ errorCode: '20092', parameters: res.id });
            });
          });
      });
    } else {
      return super.error(reply)({ errorCode: '20090', parameters: 'file' });
    }
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

  readFile (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      params: _.cloneDeep(request.params)
    };

    let getFile = (d, data) => {
      return new Promise((resolve, reject) => {
        d.files.get({
          fileId: data.fileid,
          alt: 'media'
        }, {
          encoding: null
        }, (err, res, body) => {
          if (!err) {
            resolve({ res, body });
          } else {
            reject({ errorCode: '20091', parameters: err });
          }
        });
      });
    };

    let readFile = async function (business, options, cb) {
      try {
        const auth = await gapi();
        const drive = google.drive({ version: 'v2', auth: auth });

        let data = await business.byId(options);
        let file = await getFile(drive, data.dataValues);

        cb(null, file);
      } catch (err) {
        cb(err);
      }
    };

    readFile(this._business, options, (err, result) => {
      if (!err) {
        return reply(result.res)
          .type(result.body.headers['content-type'])
          .encoding('binary')
          .code(HTTPStatus.OK)
      } else {
        return super.error(reply)(err);
      }
    });
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
      .catch(super.error(reply));
  }

  remove (request, reply) {
    let options = {
      headers: _.cloneDeep(request.headers),
      params: _.cloneDeep(request.params)
    };

    let verifyDoc = (options) => {
      return new Promise((resolve) => {
        this._business.byId(options)
          .then((qr) => {
            const data = qr.dataValues;

            if (data) {
              resolve(data);
            } else {
              resolve(false);
            }
          })
          .catch((err) => {
            resolve(false);
          });
      });
    }

    let deleteDoc = (options, data) => {

      gapi().then((auth) => {
        const drive = google.drive({ version: 'v2', auth: auth });

        drive.files.delete({
          fileId: data.fileid
        }, (err, res, body) => {
          if (!err && body.statusCode == 204) {
            return this._business.delete(options)
              .then(() => reply().code(HTTPStatus.NO_CONTENT))
              .catch(super.error(reply));
          } else {
            super.error(reply)({ errorCode: '20093', parameters: err || body.statusCode })
          }
        });
      });

    };

    verifyDoc(options)
      .then((data) => {
        if (!data) {
          return reply(HTTPStatus[404]).code(HTTPStatus.NOT_FOUND);
        } else {
          deleteDoc(options, data);
        }
      });
  }
}
