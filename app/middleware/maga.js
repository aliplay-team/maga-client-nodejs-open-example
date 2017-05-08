'use strict';

const getRawBody = require('raw-body');

module.exports = () => {
  return function* maga(next) {
    const ctx = this;
    // 判断是 maga 协议，自动解包
    if (ctx.get('x-mg-appkey')) {
      // 获取 body buffer
      const rawBody = yield getRawBody(ctx.req);
      // 解包，并赋值给 request.body ，方便业务使用
      ctx.request.body = ctx.maga.server.decode({ meta: ctx.headers, payload: rawBody });
      ctx.request.rawBody = rawBody;
    }
    yield next;
  };
};
