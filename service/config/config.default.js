/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592445779971_4938';
  config.security={
    csrf:{enable:false}
  }
  config.cors={
    origin:'*',
    credentials:true,//允许cookie/session跨域
    allowMethods:"GET,HEAD,PUT,POST,DELETE,PATCH"
  }
  // add your middleware config here
  config.middleware = [];
  config.mysql={
    client:{
      host:'localhost',
      port:'3306',
      user:'root',
      password:'123456',
      database:'react_blog'
    }
  }
  config.bodyParser={
    
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig,
  };
};
