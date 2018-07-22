'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532250199212_8761';


  config.view = {
    defaultViewEngine: 'nunjucks',
  };
  // add your config here
  config.middleware = [];

  return config;
};
