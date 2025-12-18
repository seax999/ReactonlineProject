const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/jsonApi",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        "^/jsonApi": "https://jsonplaceholder.typicode.com/", // 可选：移除/api前缀
      },
    })
  );

  // 可以添加更多代理规则
  // app.use(
  //   "/upload",
  //   createProxyMiddleware({
  //     target: "http://localhost:3002",
  //     changeOrigin: true,
  //   })
  // );
};
