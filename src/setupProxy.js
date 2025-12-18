const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/jsonApi",
    createProxyMiddleware({
      target: "https://jsonplaceholder.typicode.com",
      changeOrigin: true,
      pathRewrite: {
        "^/jsonApi": "/", // 可选：移除前缀
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
