const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');

module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    chainWebpack: config => {
        config.optimization.minimize(true);
        config.optimization.splitChunks({
            chunks: 'all'
        });
    },
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'axios': 'axios',
            'Vue-Lazyload': 'Lazyload',
            'vue-router': 'VueRouter',
        };
    },
    productionSourceMap: false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    }),
                ]
            },
            scss: {
                prependData: `@import "~@/assets/css/variables.scss";`
            },
            less: {
                modifyVars: {
                    hack: `true; @import "${path.join(
                        __dirname,
                        '/src/assets/css/vant_theme.less'
                    )}";`
                }
            }
        }
    },
    devServer: {
        port: 8382,
        host: 'localhost',
        https: false,
        open: true,
        proxy: {
            '/app': {
                target: 'http://fx.jjjcyjj.cn/forex-app-api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/app': '/'
                }
            },
        },
    }
};
