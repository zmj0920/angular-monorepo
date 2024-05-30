const PROXY_CONFIG = [
    {
      context: [],
      target: 'https://172.0.0.1',
      changeOrigin: true,
      secure: false,
      headers: {
        Cookie: 'SESSION=xxxxx'
      }
    },
  ];
  module.exports = PROXY_CONFIG;
  