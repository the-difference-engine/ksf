const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        // target: process.env.REACT_APP_API_URL,
        target: 'http://localhost:3000',

        changeOrigin: true,
      })
    );
};
