# egg_svg-captcha_demo



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 使用指南

- 思路：不使用session存储图片验证码，使用redis和uuid进行验证码校验，1、用户访问图片验证码时，后台根据用户请求生成uuid，将uuid和验证码字符串存入redis中，这里可以设置验证码的有效期。2、需要将uuid回传给前台用户，3、用户校验图片验证码时，需要传uuid和图片验证码到服务器，4、服务器通过前台传过来的uuid从redis中取出验证码，将其与用户传过来的验证码进行比对，判断是否放行。
- 图片验证码模块：https://github.com/lemonce/svg-captcha，官方提供express实例。
- egg中使用svg-captcha需要进行设置，  其中响应类型this.ctx.set('Content-Type', 'image/svg+xml')最重要，如果不设置响应类型，将会不起作用;
- svg-captcha 返回的是svg二进制数据，前台展示如果不适用img标签，请注意用法。

```     
       this.ctx.status = 200;
       //这里一定要设置，不然网页中无法显示图片
       this.ctx.set('Content-Type', 'image/svg+xml') ;
       this.ctx.body=captcha.data;
```

