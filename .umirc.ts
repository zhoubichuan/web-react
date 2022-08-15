import { defineConfig } from 'dumi'
const getLessConfig = require('./lessConfig')
const lessConfig = getLessConfig()
const menuConfig = require('./config/menuConfig')
const navConfig = require('./config/navConfig')

export default defineConfig({
  title: 'HDD Design',
  favicon: '/xxx',
  logo: '/xxx',
  // base: '/dumi-template-antd/',
  lessLoader: lessConfig,
  mode: 'site',
  menus: menuConfig,
  navs: navConfig,
  publicPath: '/dumi-template-antd/',
  // chainWebpack(memo, { env, webpack, createCSSRule }) {
  //   console.log(memo.output.publicPath)
  //   // memo.output.publicPath = ()
  // },
  extraBabelPresets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions']
        },
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  extraBabelPlugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread'
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    proxy: {
    }
  }
  // more config: https://d.umijs.org/config
})
