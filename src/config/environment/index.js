'use strict';

import Fs from 'fs';
import Path from 'path';
import Dotenv from 'dotenv';
import pack from '../../../package.json';

let initEnvVariables = () => {
  // Set default node environment to development
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const envPath = process.env.NODE_ENV === 'test' ? Path.join(__dirname, '/../../../test/.env') : Path.join(__dirname, '/../../../.env-' + process.env.NODE_ENV);

  try {
    Fs.statSync(envPath);
    Dotenv.config({ path: envPath });
  } catch (err) { console.log(envPath + ' not found, load by environment variables'); }
};
initEnvVariables();

// All configurations will extend these options
// ============================================
let all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: Path.normalize(Path.join(__dirname, '/../../..')),

  // Configure routes baseDir
  routesBaseDir: Path.normalize(Path.join(__dirname, '/../../api')),

  // Configure routes basePath
  routesPath: '/v1/hapies6referencia',

  routesTimeout: process.env.ROUTES_TIMEOUT ? Number(process.env.ROUTES_TIMEOUT) : 1000,

  // Server HOST
  host: process.env.HOST || '0.0.0.0',

  // Server port
  port: process.env.PORT || 9000,

  system: process.env.SYSTEM,

  projectVersion: pack.version,

  log: {
  },

  mysql: {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    write: {
      host: process.env.MYSQL_WRITE_HOST, pool: { min: process.env.MYSQL_WRITE_POOL_MIN, max: process.env.MYSQL_WRITE_POOL_MAX, idle: process.env.MYSQL_WRITE_POOL_IDLE }
    },
    read: [
      { host: process.env.MYSQL_READ_HOST_1, pool: { min: process.env.MYSQL_READ_POOL_MIN_1, max: process.env.MYSQL_READ_POOL_MAX_1, idle: process.env.MYSQL_READ_POOL_IDLE_1 } },
      { host: process.env.MYSQL_READ_HOST_2, pool: { min: process.env.MYSQL_READ_POOL_MIN_2, max: process.env.MYSQL_READ_POOL_MAX_2, idle: process.env.MYSQL_READ_POOL_IDLE_2 } },
      { host: process.env.MYSQL_READ_HOST_3, pool: { min: process.env.MYSQL_READ_POOL_MIN_3, max: process.env.MYSQL_READ_POOL_MAX_3, idle: process.env.MYSQL_READ_POOL_IDLE_3 } },
      { host: process.env.MYSQL_READ_HOST_4, pool: { min: process.env.MYSQL_READ_POOL_MIN_4, max: process.env.MYSQL_READ_POOL_MAX_4, idle: process.env.MYSQL_READ_POOL_IDLE_4 } },
      { host: process.env.MYSQL_READ_HOST_5, pool: { min: process.env.MYSQL_READ_POOL_MIN_5, max: process.env.MYSQL_READ_POOL_MAX_5, idle: process.env.MYSQL_READ_POOL_IDLE_5 } }
    ]
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
export default all;
