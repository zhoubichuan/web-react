---
nav:
  title: 基础知识
  order: 2
group:
  title: React 的工程化流程
  order: 2
title: UI框架
order: 6
---

# 五.UI 框架

## 1.antdesign

## 2.antdesignPro

### 1.1 工具选择

| 工具选择 | 依赖包                           | 说明 | 其他 | 是否必须 | 备注 |
| -------- | -------------------------------- | ---- | ---- | -------- | ---- |
| 框架     | react                            |      |      | ✅       |      |
| JS 语言  | TypeScript                       |      |      | ✅       |
| CSS 语言 | css-modules + less + postcss     |      |      | ✅       |
| JS 编译  | babel                            |      |      | ✅       |
| 模块打包 | webpack 全家桶                   |      |      | ✅       |      |
| 单元测试 | jest + enzyme + puppteer + jsdom |      |      | ✅       |      |
| 路由     | react-router                     |      |      | ✅       |      |
| 数据流   | dva + redux 生态                 |      |      | ✅       |      |
| 代码风格 | eslint+prettier                  |      |      | ✅       |      |
| JS 压缩  | TerserJS                         |      |      | ✅       |      |
| CSS 压缩 | cssnano                          |      |      | ✅       |      |
| 请求库   | umi-request                      |      |      | ✅       |      |
| UI       | AntDesign+ AntDesignPro          |      |      | ✅       |      |
| 国际化   | react-intl                       |      |      | ✅       |      |
| hooks 库 | umi-hooks                        |      |      | ✅       |      |
| 静态文档 | docz                             |      |      | ✅       |      |
| 微前端   | qiankun                          |      |      | ✅       |      |
| 图表库   | antv                             |      |      | ✅       |      |

### 1.2 技术栈选型

#### 1.2.1 固定化

- react 框架
- typescript 语言
- less + cssModules
- eslint+prettier+固定配置
- 固定数据流方案 dva
- 固定 babel 插件
- jest+enzyme
- 框架版本不允许锁定
- 主要依赖不允许自定义依赖版本

#### 1.2.2 配置化

- 不仅是框架功能，还有 ui 界面
- 路由、布局、菜单、导航、面包屑、权限、请求、埋点、错误处理
- 只管写 page 页面就可以了

##### 1.2.2.1 编译态配置

- 给 node.js 使用，比如 webpack、babel 相关配置，静态路由配置

##### 1.2.2.2 运行态配置

- 给浏览器用、比如渲染逻辑、动态修改路由、获取用户信息

### 1.3 约定化

- 国际化
- 数据流
- mock
- 目录结构
- 404
- 权限策略
- service
- 配置文件

### 1.4 理念

- 通过最佳实践减少不必要的选择的差异
- 通过插件和插件集的架构方式，满足不同场景的业务
- 通过资产市场和场景市场着力解决 70%的开发者问题
- 通过对垂直场景采取强约束的方式，进一步提升研发效率
- 不给选择、配置化、约定化

## 2.修改 antdesign 默认样式的方式

### 2.1 style 覆盖

### 2.2 全局修改

- `#root`方法
  src/global.less

```less
.ant-select-selection {
font-size: 16px
```

- `global`方法

```less
:global .ant-select-selection {
  font-size: 16px;
}
```

如果权重不够可以加上!important

### 2.3 局部修改某一组件样式

- `className={styles.selection}`

```css
.selection {
  :global {
    .ant-select-selection {
      background-color: red !important; //设置颜色
    }
  }
}
```

- ` className="select_test"`

```css
:global {
  .select_test {
    //给该select框加的className
    .ant-select-selection {
      background-color: red;
    }
  }
}
```
