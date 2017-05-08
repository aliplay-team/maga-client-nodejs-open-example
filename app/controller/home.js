'use strict';

const qs = require('querystring');

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      this.ctx.body = 'hi, maga test';
    }

    // 测试用: curl -X POST http://localhost:7001/api/abcd
    * api() {
      const ctx = this.ctx;
      const { maga, headers, params } = ctx;

      // 请求的 api 名字，如 `csbiz.account.findUserById`
      const service = params.service;

      // 获取请求数据，在 `middleware/maga` 里面已经完成了解包
      const reqData = ctx.request.body;

      // 请求的 app key，回复的时候也要用它加密
      const appKey = ctx.get('x-mg-appkey');

      // 组装响应数据
      const result = {
        from: 'node server',
        service,
        reqData,
        headers,
      };

      // 在 context 里面覆盖了 response 方法，用于自动打包响应，设置 headers 和 response body
      maga.server.response({ result, id: reqData.id, key: appKey });
    }

    // 测试用: curl -X POST http://localhost:7001/proxy/api/csbiz.account.findUserById?ver=1.0.0
    * proxy() {
      const ctx = this.ctx;
      const { maga, params } = ctx;

      // 请求的 api 名字，如 `csbiz.account.findUserById`
      const service = params.service;

      // 获取请求数据，在 `middleware/maga` 里面已经完成了解包
      const reqData = ctx.request.body;
      // 把请求代理去远端
      const result = yield maga.client.request({
        service: '/api/' + service + '?' + qs.stringify(ctx.query),
        data: reqData,
      });

      // 在 context 里面覆盖了 response 方法，用于自动打包响应，设置 headers 和 response body
      maga.server.response({ result, id: reqData.id });
    }
  }
  return HomeController;
};
