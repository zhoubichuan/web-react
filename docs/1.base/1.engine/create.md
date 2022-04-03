---
nav:
  title: 基本语法
  order: 2
group:
  title: React 的工程化流程
  order: 2
title: 创建项目
order: 3
---

# 二.创建项目

## 1.创建普通 react 项目

通过 create-react-app 脚手架快速搭建 react 项目

<Alert type="warning">
  要求：Node>=8.10 并且 npm>=5.6
</Alert>

**安装 create-react-app**

```bash
npm install -g create-react-app
```

**检测 create-react-app 是否安装成功**

```bash
create-react-app -V # 注意：V 是大写的
```

**创建 react 项目**

- 通过脚手架创建一个 React 项目

```bash
npx create-react-app my-app  # 注意：名字不能包含大写字母
# 或者
# create-react-app my-app
cd my-app
npm start
```

说明：npx 是 npm 5.2+ 附带的 package 运行工具

## 2.创建 react+ typescript 项目

```sh
npx create-react-app my-app --template typescript
```
