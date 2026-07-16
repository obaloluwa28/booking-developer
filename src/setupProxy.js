const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost/wisefares-backend',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api', // This ensures /api stays as /api
            },
        })
    );
};