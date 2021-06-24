// const target = process.env.VUE_APP_API_URL;
// const proxy = require('http-proxy-middleware');

const postcssPxtorem = require('postcss-pxtorem')

module.exports = {
  publicPath: './',

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcssPxtorem({
            rootValue: 30, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: ['van-'], // 忽略转换正则匹配项
            propList: ['*'], // 要转换的匹配项
            minPixelValuen: 3
          })
        ]
      },
      less: {
        modifyVars: {
          // 直接覆盖变量
          'button-primary-border-color': '#2768ff',
          'button-primary-background-color': '#0f58ff',
          '@green': '#0f58ff',
          green: '#0f58ff'
        }
      }
    }
  },

  devServer: {
    port: 8080,
    // 所有的接口请求代理
    proxy: {
      '/apiERP': {
        target: 'http://www.feibaiedu.net/erp4_debug/Ver2',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apiERP': '/'
        }
      },
      '/apiTRMS': {
        target: 'http://www.feibaiedu.net/TRMS/Ver2',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apiTRMS': '/'
        }
      },
      '/apiTMS': {
        target: 'http://115.159.186.190:2333/Ver2',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apiTMS': '/'
        }
      }
    }
  },

  productionSourceMap: false
}
