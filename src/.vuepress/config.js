module.exports = {
  // 基础配置
  base: '/Web-React/', // 部署站点的基础路径
  description: '以大多数人的努力程度之低，根本轮不到拼天赋',
  locales: {
    // 默认标题
    '/': {
      title: 'React笔记',
      description: ''
    }
  },
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  head: [
    // 添加链接 pwa 的 manifest 如果需要
    [
      'link',
      {
        rel: 'icon',
        href: ''
      }
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileColor',
        content: '#000000'
      }
    ]
  ],
  port: 3009,
  dest: 'dist', // 指定 vuepress build 的输出目录
  serviceWorker: false, // pwa

  // 主题配置
  themeConfig: {
    editLinks: true,
    docsDir: 'src', // 假如文档不是放在仓库的根目录下
    locales: {
      '/': {
        docsBranch: 'master', // 假如文档放在一个特定的分支下
        editLinks: true, // 启用编辑
        editLinkText: '在github上编辑此页',
        lastUpdated: '上次更新', // 获取每个文件最后一次 git 提交的时间戳
        nav: [{
            text: '基础知识',
            items: [{
                text: '一.React的工程化',
                link: '/base/react/1.create'
              },
              {
                text: '二.企业管理系统',
                link: '/base/manager/1.index',
              }
            ]
          },
          {
            text: '高级知识',
            items: [{
                text: '一.专项知识',
                link: '/senior/use/1.recursionAndDynamics'
              },
              {
                text: '二.组件开发',
                link: '/senior/component/init'
              },
              {
                text: '三.TypeScript',
                link: '/senior/ts/init'
              },
              {
                text: '四.umi',
                link: '/senior/ts/init'
              },
              {
                text: '五.dva',
                link: '/senior/ts/init'
              },
            ]
          },
          {
            text: '源码知识',
            items: [{
                text: '一.react',
                link: '/source/react/1.preparation'
              },
              {
                text: '二.react-dom',
                link: '/source/react-dom/1.preparation'
              },
              {
                text: '三.react-router',
                link: '/source/react-router/1'
              },
              {
                text: '四.redux',
                link: '/source/react-router/1'
              }
            ]
          },
          {
            text: '书籍阅读',
            items: [{
                text: '1.React 前端技术与工程实践',
                link: '/read/1/inde'
              }
            ]
          }
        ],
        sidebar: {
          '/base/react/': [
            '1.create',
            '2.webpack',
            '3.eslint',
            '4.code',
            '5.utils',
            '7.module',
            '8.life',
            '9.message',
            '10.skill',
            '11.redux',
            '12.umi',
            '13.dva',
            '14.saga',
            '15.react-router',
            '16.next'
          ],
          '/base/manager/': [
            '1.index',
            '1.init',
            '2.cli',
            '3.layout',
            '4.perm',
            '5.menu',
            '6.message',
            '7.language'
          ],
          '/senior/use/': [
            '1.recursionAndDynamics',
            '2.extend',
            '3.componentCommunication',
            '4.render',
            '5.api',
            '6.form',
            '7.checkBox',
            '8.active',
            '9.alert',
            '10.table',
            '11.tree'
          ],
          '/senior/component/': [
            'init'
          ],
          '/senior/ts/': [
            'init',
            '1',
            '2',
            '3'
          ],
          '/senior/npm/': [],
          '/source/react/': [
            '1.preparation'
          ],
          '/source/react-dom/': [
            '1.preparation',
            '3.ReactRoot',
            '3.1root',
            '3.2expirationTime',
            '3.3UpdateQueue',
            '4.renderRoot',
            '4.1createWorkInProgress',
            '4.2workLoop',
            '4.3onComplete',
            '5.commitRoot',
            '5.1lcommitBeforeMutationLifecycles',
            '5.2commitAllHostEffects',
            '5.3lcommitAllLifeCycles',
            // '7.reactReconciler'
          ]
        }
      }
    }
  },
}