'use strict';

import Config from './environment';
import Sequelize from 'sequelize';
import KlawSync from 'klaw-sync';
import _ from 'lodash';

const db = {};

let createDBConnection = () => {
  let configSequelize = {
    logging: process.env.NODE_ENV === 'development' ? console.log : null,
    dialect: 'mysql',
    port: Config.mysql.port,
    host: Config.mysql.host,
    dialectOptions: {
      multipleStatements: true
    }
  };

  if (!_.isEmpty(Config.mysql.write) && !_.isEmpty(Config.mysql.write.host)) {
    configSequelize.replication = {};
    configSequelize.replication.write = Config.mysql.write;

    let replicas = [];

    if (_.isEmpty(Config.mysql.read)) {
      throw new Error('To enable the use of replication you must inform a database write and at least one database read');
    } else {
      Config.mysql.read.forEach(read => {
        if (!_.isEmpty(read) && !_.isEmpty(read.host)) {
          replicas.push(read);
        }
      });
    }
    if (_.isEmpty(replicas)) {
      throw new Error('To enable the use of replication you must inform a database write and at least one database read');
    }

    configSequelize.replication.read = replicas;
    delete configSequelize.host;
  }

  return new Sequelize(Config.mysql.database, Config.mysql.user, Config.mysql.password, configSequelize);
};

let sequelizeConnection = createDBConnection();

sequelizeConnection.authenticate().then((err) => {
  if (err) {
    console.log('Unable to connect to the database:', err);
  } else {
    console.log('Connection has been established successfully.');
  }
});

const filterFn = item => item.path.endsWith('-model.js');

KlawSync(Config.routesBaseDir, { filter: filterFn }).forEach(function (file) {
  let model = sequelizeConnection['import'](file.path);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

let sequelize = () => {
  if (!sequelizeConnection) {
    sequelizeConnection = createDBConnection();
  }
  return sequelizeConnection;
};

export default Sequelize;
export { sequelize };
