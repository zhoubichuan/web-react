---
nav:
  title: 基本语法
  order: 2
group:
  title: React 的工程化流程
  order: 2
title: 开发工具
order: 2
---

# 一.开发工具

**了解前端项目中需要配置的相关环境和工具，显著提高工作效率**
## 1.Node.js

- 1.[官网下载 Node.js](http://nodejs.cn)（以 windows 系统 64 位为例）

  ![](./1.utils1.png)

- 2.安装 Node.js（注意有时有问题需要注意环境变量的配置）

- 3.cmd 中查看 node 版本，校验安装成功后，升级 npm

  ```sh
  node -v
  npm install -g npm@latest # npm i npm -g
  ```

## 2.版本控制

<Alert type="info">
推荐使用`Git`及相关插件，不推荐 `SVN` 管理代码，但是推荐管理相关技术文档资料
</Alert>

### 2.1 安装 Git

- [Git 官网](https://git-scm.com)下载 git 进行安装
- 常用命令
  - 代码合并提交
  - 创建分支、切分支
  - 临时存储

### 2.2 安装 TortoiseGit（git 比较好用的一个图形化工具，新手推荐用这个替代命令行）

- [TortoiseGit 官网](https://tortoisegit.org/download/)下载 TortoiseGit 进行安装
- 使用教程

### 2.3 gitlab（代码仓库）

- 配置 ssh
- 分支策略
- 权限

## 3.编辑器

<Alert type="info">
推荐使用`Visual Studio Code`，不推荐 hbuilder、sublime text、WebStorm、Atom
</Alert>

- [安装 Visual Studio Code](https://code.visualstudio.com)

  ![](./1.utils3.png)

- 代码对比

- 批量正则替换

## 4.谷歌浏览器

- Chrome 跨域，方便本地开发解决跨域问题(--user- data- dir=C:\MyChromeDevUserData)

  ![](./1.utils4.png)
  ![](./1.utils4.1.png)

- Chrome 浏览器调试技巧
- Chrome LightHouse
- vue 代码调试插件：vue-devtools
- vue 页面性能测试插件：Vue performance Devtool

## 5.npm

<Alert type="warning">
  推荐在 vscode bash 中运行相关命令
</Alert>

```bash
rm -rf node_modules #一些常见的命令操作需不能在cmd中执行，如删除依赖这个命令需要在bash中使用
```

### 5.1 npm

- npm(node package manage)是 nodejs 自带的包管理工具。
- package.json
  - ~会匹配最近的小版本依赖包，比如~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
  - ^会匹配最新的大版本依赖包，比如^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0
  - \*这意味着安装最新版本的依赖包

### 5.2 cnpm

```sh
npm i --registry=https://registry.npm.taobao.org #可以在安装包的时候指定下载源
npm config set registry https://registry.npm.taobao.org #改变全局默认下载地址
npm install cnpm -g --registry=https://registry.npm.taobao.org
```

- cnpm 不受 package-lock.json 影响，只会根据 package.json 进行下载

### 5.3 yarn

- 有时候通过 cnpm 下载的包莫名不能用， 可以换用 yarn 解决这个问题

### 5.4 pnpm

- pnpm 速度快
