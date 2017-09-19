'use strict';

// load deps
import Server from './config/server';

Server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('info', 'Server Running At: ' + Server.info.uri);
});
