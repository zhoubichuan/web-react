import { defineConfig } from 'dumi'
const getLessConfig = require('./lessConfig')
const lessConfig = getLessConfig()
const menuConfig = require('./config/menuConfig')
const navConfig = require('./config/navConfig')

export default defineConfig({
  title: 'web-react',
  description: 'react 学习笔记',
  base: '/web-react/',
  publicPath: '/web-react/',
  // favicon: '/favicon.ico',
  logo: 'http://img.mrsingsing.com/javascript-guidebook-favicon.png',
  hash: true,
  lessLoader: lessConfig,
  mode: 'site',
  menus: menuConfig,
  navs: navConfig,
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
    '@babel/plugin-proposal-object-rest-spread',
    // 'import',
    // {
    //   libraryName: 'antd',
    //   libraryDirectory: 'es',
    //   style: 'css',
    // },
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    proxy: {
    }
  },
  exportStatic: {},
})
