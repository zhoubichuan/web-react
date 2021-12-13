module.exports = {
  // 基础配置
  base: '/web-react/', // 部署站点的基础路径
  description: '',
  locales: {
    // 默认标题
    '/': {
      title: 'React学习笔记',
      description: ''
    }
  },
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    },
    '@vuepress/back-to-top': true,
    '@vuepress/medium-zoom': true,
    '@vuepress/nprogress': true,
    // 名称：@vuepress/plugin-active-header-links 效果：页面滚动时自动激活侧边栏链接的插件，效果就是右边内容滚动的时候，看到哪里了，左侧菜单会自动高亮显示当前看的目录。
    '@vuepress/active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    },
    "@vssue/vuepress-plugin-vssue": {
      platform: 'github', //v3的platform是github，v4的是github-v4
      locale: 'zh', //语言
      // 其他的 Vssue 配置
      owner: 'zhoubichuan', //github账户名
      repo: 'web-vue', //github一个项目的名称
      clientId: 'Iv1.2923ba5d4de48a3c', //注册的Client ID
      clientSecret: '110210', //注册的Client Secret
      autoCreateIssue: true // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
    },
    "vuepress-plugin-boxx": ["vuepress-plugin-boxx"]
  },
  port: 3009,
  dest: 'dist', // 指定 vuepress build 的输出目录
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
        nav: [
          {
            text: '基础知识',
            items: [
              {
                text: '一.React的工程化',
                link: '/base/engine/1.index'
              },
              {
                text: '二.React 功能模块',
                link: '/base/manager/1.index',
              },
              {
                text: '三.React 开发基础',
                link: '/base/react/1.index',
              }
            ]
          },
          {
            text: '高级知识',
            items: [
              {
                text: '一.专项知识',
                link: '/senior/use/1.index'
              },
              {
                text: '二.组件开发',
                link: '/senior/component/1.index'
              },
              {
                text: '三.React + TS',
                link: '/senior/ts/1.index'
              },
              {
                text: '四.umi',
                link: '/senior/umi/1.index'
              },
              {
                text: '五.dva',
                link: '/senior/dva/1.index'
              },
            ]
          },
          {
            text: '源码知识',
            items: [
              {
                text: '一.react',
                link: '/source/react/1.preparation'
              },
              {
                text: '二.react-dom',
                link: '/source/react-dom/1.preparation'
              },
              {
                text: '三.react-router',
                link: '/source/react-router/1.index'
              },
              {
                text: '四.redux',
                link: '/source/redux/1.index'
              }
            ]
          },
          {
            text: '书籍阅读',
            items: [
              {
                text: '1.React 前端技术与工程实践',
                link: '/read/1/1.index'
              }
            ]
          }
        ],
        sidebar: {
          '/base/engine/': [
            '1.index',
            '1.utils',
            '2.create',
            '3.webpack',
            '4.env',
            '5.ui',
            '6.project',
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
          '/base/react/': [
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
            '1.index',
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
            '1.index',
            '1.recursion',
            '2.dynamics',
            '3.extend',
            '4.render',
            '5.api',
            '6.form',
            '7.checkBox',
            '8.dispaly',
            '9.alert',
            '10.renderTable',
            '11.slotScopeTable',
            '12.tree'
          ],
          '/senior/ts/': [
            '1.index',
            '1',
            '2',
            '3'
          ],
          '/senior/umi/': [
            '1.index',
            '1',
            '2',
            '3'
          ],
          '/senior/dva/': [
            '1.index',
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
          ],
          '/source/react-router/': [
            '1.index'
          ],
          '/source/redux/': [
            '1.index'
          ],
          '/read/1/': [
            '1.index'
          ],
        }
      }
    }
  },
}