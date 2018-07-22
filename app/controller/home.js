'use strict';

const Controller = require('egg').Controller;
var svgCaptcha = require('svg-captcha');
//图片验证码uuid
const uuidv1 = require('uuid/v1');
//引入redis
const Redis=require('ioredis');
const redis=new Redis;

class HomeController extends Controller {

  //访问首页
  async index() {
    await this.ctx.render('index.html');
  }

  //获取图片验证码
  async getImage() {
    const captcha = svgCaptcha.create();
    //验证按字符串
    const captcha_text=captcha.text;
    //生成uuid存储验证码
    const uuid=uuidv1();
    console.log(uuid);
    //将验证码存入缓存中,并设置60S过期
    redis.set(uuid, captcha_text,'ex',600);
    console.log(captcha.text);

    this.ctx.status = 200;
    //这里一定要设置，不然网页中无法显示图片
    this.ctx.set('Content-Type', 'image/svg+xml') ;
    this.ctx.body=captcha.data;
  }

  //校验图片验证码
  async checkImageCode() {
    const imageCode =  this.ctx.query.imageCode;
    console.log(imageCode);
    const uuid =  this.ctx.query.uuid;
    console.log(uuid);
    //从redis中取出验证码
    const imageCodeFormRedis= await redis.get(uuid);
    console.log(imageCodeFormRedis);
    //判断图片验证码是否相同
    if(imageCode==imageCodeFormRedis){
      //图片验证码校验通过后，才能进行用户名和密码的校验。
      this.ctx.body = {success:'success'};
    }else
    {
      this.ctx.body = {success:'fail'};
    }

  }
}

module.exports = HomeController;
