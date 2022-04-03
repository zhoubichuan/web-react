const config = {
  mode: 'site',
  title: 'web-react',
  description: 'react 完全知识体系',
  base: '/web-react/',
  publicPath: '/web-react/',
  favicon: './favicon.ico',
  logo: 'http://img.mrsingsing.com/javascript-guidebook-favicon.png',
  hash: true,
  exportStatic: {},
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/zhoubichuan/web-react',
    },
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
};

if (process.env.NODE_ENV !== 'development') {
  config.ssr = {};
}

export default config;
