'use strict';

// load environment configurations
import Config from './environment';
import Hapi from 'hapi';

// load plugins
import ResponseTime from 'hapi-response-time';

import Auth from '../commons/hapi/auth';
import Documentation from '../commons/hapi/documentation';
import ReplyDecorator from '../commons/hapi/reply-decorator';
import Routes from '../commons/hapi/routes';

// instantiate a new server
const Server = new Hapi.Server();

// set the port for listening
Server.connection({
  host: Config.host,
  port: Config.port,
  routes: {
    cors: true,
    validate: {
      options: {
        abortEarly: false
      }
    },
    timeout: Config.env === 'production' || Config.env === 'stage' ? { server: Config.routesTimeout } : undefined
  }
});

const plugins = [
  { register: ReplyDecorator },
  { register: ResponseTime },
  {
    register: Documentation,
    options: {
      config: Config,
      tags: {
        'hapies6-reference-project': 'Reference API'
      },
      info: {
        title: 'hapies6-reference-project',
        description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
        version: '1.0.0'
      },
      title: 'hapies6-reference-project'
    }
  },
  {
    register: Auth,
    options: {
      validateFunc: function (decoded, request, cb) {
        return new Promise((resolve, reject) => {
          resolve();
        })
          .then(() => { cb(null, true); return null; })
          .catch(() => cb(null, false));
      }
    }
  },
  { register: Routes, options: { config: Config } }
];

if (process.env.NODE_ENV === 'development') {
  plugins.push({ register: require('blipp') });
}

Server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  if (!module.parent) {
    Server.start((err) => {
      if (err) {
        throw err;
      }

      Server.log('info', 'Server running at: ' + Server.info.uri);
    });
  }
});

export default Server;
