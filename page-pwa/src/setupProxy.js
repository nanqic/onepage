const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
            pathRewrite: { '^/api': '' } //去除请求前缀，保证交给后台服务器的是正常请求地址
        })
    );
};