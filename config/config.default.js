'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1493869248951_703';

  config.maga = {
    client: {
      key: 'ngclient#2dcd',
      secret: 'wqjx0iXcRw2uEXdmjlruzw003',
      host: 'http://100.84.225.171:9010',
      level: 'DEBUG',
    },
    server: {
      keystore: {
        'ngclient#2dcd': 'wqjx0iXcRw2uEXdmjlruzw003',
      },
      level: 'DEBUG',
    },
  };

  config.middleware = [ 'maga' ];

  config.security = {
    csrf: false,
  };

  return config;
};
