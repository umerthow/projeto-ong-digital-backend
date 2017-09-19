'use strict';

import klawSync from 'klaw-sync';
const version = '0.0.5';

const register = (server, options, next) => {
  let routes = [];
  const filterFn = item => item.path.endsWith('-routes.js');

  klawSync(options.config.routesBaseDir, {filter: filterFn})
    .forEach(route => {
      const routeObject = {
        register: require(route.path),
        options: {
          config: options.config
        },
        routes: {
          prefix: options.config.routesPath
        }
      };
      routes.push(routeObject);
    });
  server.register(routes, err => {
    next(err);
  });
};

register.attributes = {
  name: 'routes',
  version: version
};

export default register;
