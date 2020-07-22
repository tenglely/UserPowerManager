module.exports = {
    devServer: {
      proxy: { // 为接口配置代理，解决跨域
        '/apis': {
          //target: 'http://www.txkk.online:8001', //接口地址
          target: 'http://localhost:8001',
          changeOrigin: true, // 跨域访问设置，true代表跨域
          pathRewrite: { // 路径改写规则
            '^/apis': '' // 以/proxy/为开头的改写为''
          }
        }
      }
    }
  }