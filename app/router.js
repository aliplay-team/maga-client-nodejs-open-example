'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.post('/api/:service', 'home.api');
  app.post('/proxy/api/:service', 'home.proxy');
};
