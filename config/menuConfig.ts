const antdPath = [
  'Button/index.md',
  'Card/index.md',
  'Divider/index.md',
  'Dropdown/index.md',
  'Form/index.md',
  'Grid/index.md',
  'Layout/index.md',
  'List/index.md',
  'Radio/index.md',
  'Select/index.md',
  'Space/index.md',
  'Switch/index.md',
  'Upload/index.md',
  'DialogPart/index.md',
  'SearchPart/index.md',
  'TablePart/index.md',
]

module.exports = {
  // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
  '/components': [
    {
      title: ' 基础组件',
      children: antdPath
    }
  ],
  '/': [
    {
      title: '综合案例',
      path: '/quick-start'
    }
  ],
  '/quick-start': [
    {
      title: '综合案例',
      path: '/quick-start'
    }
  ],
  '/base': [
    {
      title: '基础知识',
      path: '/1.base'
    }
  ],
  '/senior': [
    {
      title: '高级知识',
      path: '/2.senior'
    }
  ],
  '/source': [
    {
      title: '源码知识',
      path: '/3.source'
    }
  ],
  '/read': [
    {
      title: '阅读资料',
      path: '/4.read'
    }
  ],
}
