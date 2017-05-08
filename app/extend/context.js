'use strict';

const MAGA = Symbol('Context#maga');
const Maga = require('@aligames/maga-open');

module.exports = {
  get maga() {
    if (!this[MAGA]) {
      const server = new Maga.Server(this.app.config.maga.server);
      // 覆盖掉 response，自动设置 headers 和 body
      const originFn = server.response.bind(server);
      server.response = ({ id, code, msg, result, key }) => {
        // 打包响应，获取 headers 和 response body
        const { meta, payload } = originFn({ id: id || Date.now(), code, msg, result, key });
        // 丢给 egg
        this.set(meta);
        this.body = payload;
      };

      const client = new Maga.Client(Object.assign({
        httpclient: this.httpclient,
      }, this.app.config.maga.client));

      this[MAGA] = {
        server,
        client,
        Sdk: Maga,
      };
    }
    return this[MAGA];
  },
};
