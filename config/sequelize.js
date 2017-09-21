// Update with your config settings.
const Fs = require('fs');
const Path = require('path');
const _ = require('lodash');

process.env.NODE_ENV = env('NODE_ENV') || 'development';
const envPath = env('NODE_ENV') === 'test' ? Path.join(__dirname, '/../test/.env') : Path.join(__dirname, '/../.env-' + env('NODE_ENV'));

try {
  Fs.statSync(envPath);
  require('dotenv').config({ path: envPath, silent: true });
} catch (err) { console.log(envPath + ' not found, load by environment variables'); }

module.exports = {
  development: {
    username: env('MYSQL_USER'),
    password: env('MYSQL_PASSWORD'),
    database: env('MYSQL_DATABASE'),
    port: env('MYSQL_PORT'),
    host: !_.isEmpty(env('MYSQL_HOST')) ? env('MYSQL_HOST') : env('MYSQL_WRITE_HOST'),
    dialect: 'mysql'
  },
  test: {
    username: env('MYSQL_USER'),
    password: env('MYSQL_PASSWORD'),
    database: env('MYSQL_DATABASE'),
    port: env('MYSQL_PORT'),
    host: !_.isEmpty(env('MYSQL_HOST')) ? env('MYSQL_HOST') : env('MYSQL_WRITE_HOST'),
    dialect: 'mysql'
  },
  stage: {
    username: env('MYSQL_USER'),
    password: env('MYSQL_PASSWORD'),
    database: env('MYSQL_DATABASE'),
    port: env('MYSQL_PORT'),
    host: !_.isEmpty(env('MYSQL_HOST')) ? env('MYSQL_HOST') : env('MYSQL_WRITE_HOST'),
    dialect: 'mysql'
  },
  production: {
    username: env('MYSQL_USER'),
    password: env('MYSQL_PASSWORD'),
    database: env('MYSQL_DATABASE'),
    port: env('MYSQL_PORT'),
    host: !_.isEmpty(env('MYSQL_HOST')) ? env('MYSQL_HOST') : env('MYSQL_WRITE_HOST'),
    dialect: 'mysql'
  }
};

function env (envvar) {
  if (envvar) {
    return process.env[envvar];
  }

  return null;
}
