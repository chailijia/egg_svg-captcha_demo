'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //模拟登陆页面，
  router.get('/', controller.home.index);
  //图片验证码的请求链接，用户访问图片的时候需要将uuid回传给用户。可能需要前端动态js请求图片链接，而不能写死在img标签中。
  router.get('/getImage', controller.home.getImage);
  //get请求校验图片验证码：  http://127.0.0.1:7001/checkImageCode?uuid=1ef17550-8d9e-11e8-a5d3-b57998d8b143&imageCode=hXJW
  //参数分别为uuid和图片验证码的字符串
  router.get('/checkImageCode', controller.home.checkImageCode);
};
