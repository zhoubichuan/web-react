module.exports = {
  // 基础配置
  base: '/Web-React/', // 部署站点的基础路径
  description: 'React相关知识点',
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
                text: '1.React实践指南',
                link: '/base/build/1.config'
              },
              {
                text: '2.React基础知识',
                link: '/base/practice/base',
              }
            ]
          },
          {
            text: '高级知识',
            items: [{
                text: '1.专项知识',
                link: '/senior/use/1.recursionAndDynamics'
              },
              {
                text: '2.TypeScript',
                link: '/senior/typeScript'
              },
            ]
          },
          {
            text: '源码知识',
            items: [{
                text: '1.react源码解析',
                link: '/source/react/1.preparation'
              },
              {
                text: '2.react-dom源码解析',
                link: '/source/react-dom/1.preparation'
              },
              {
                text: '3.react-router源码解析',
                link: '/source/1'
              },
              {
                text: '4.redux源码解析',
                link: '/source/1'
              },
              {
                text: '5.antd源码解析',
                link: '/source/antd/Pagination'
              },
            ]
          }
        ],
        sidebar: {
          '/base/build/': [
            '1.config',
            '2.webpack',
            '3.file',
            '4.single',
            '5.page',
            '7.module',
            '8.project',
            '9.utils',
            '10.ui',
            '11.data',
            '12.skill',
            '13.com',
            '14.data',
            '15.api'
          ],
          '/base/practice/': [
            'base',
            'component',
            'cli',
            'ajax',
            'ui',
            'router',
            'prem',
            'redux'
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
          '/source/antd/': ['Pagination', 'Dialog', 'Autocomplete', 'Dropdown',
            'DropdownMenu', 'DropdownItem', 'Menu', 'Submenu', 'MenuItem', 'MenuItemGroup', 'Input', 'InputNumber', 'Radio', 'RadioGroup', 'RadioButton', 'Checkbox', 'CheckboxButton', 'CheckboxGroup',
            'Switch', 'Option', 'OptionGroup', 'Button', 'ButtonGroup', 'Table', 'TableColumn', 'DatePicker', 'TimeSelect', 'TimePicker', 'Popover', 'Tooltip', 'Breadcrumb', 'BreadcrumbItem',
            'Form', 'FormItem', 'Tabs', 'TabPane', 'Tag', 'Tree', 'Alert', 'Slider', 'Icon', 'Row', 'Col', 'Upload', 'Progress',
            'Spinner', 'Badge', 'Card', 'Rate', 'Steps', 'Step', 'Carousel', 'Scrollbar', 'CarouselItem', 'Collapse', 'CollapseItem', 'Cascader', 'ColorPicker', 'Transfer',
            'Container', 'Header', 'Aside', 'Main', 'Footer', 'Timeline', 'TimelineItem', 'Link', 'Divider', 'Image', 'Calendar', 'Backtop', 'PageHeader', 'CascaderPanel', 'Avatar', 'Drawer', 'Popconfirm', 'CollapseTransition', 'MessageBox'
          ],
        }
      }
    }
  },
}