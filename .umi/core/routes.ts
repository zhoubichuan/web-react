// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/zhoubichuan/Web-React/node_modules/_@umijs_runtime@3.5.21@@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": ((props) => {
        const React = require('react');
        const { default: getDemoRenderArgs } = require('/Users/zhoubichuan/Web-React/node_modules/_@umijs_preset-dumi@1.1.40@@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        })
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('/Users/zhoubichuan/Web-React/node_modules/_@umijs_preset-dumi@1.1.40@@umijs/preset-dumi/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('/Users/zhoubichuan/Web-React/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1649012108762,
          "title": "web-react - 📚 react 知识图谱：react、redux、react-router、umi、dva",
          "order": 10,
          "hero": {
            "title": "web-react",
            "desc": "<div class=\"markdown\"><p>📚 react 知识图谱：react、redux、react-router、umi、dva</p></div>",
            "actions": [
              {
                "text": "立即开始",
                "link": "/1.base/1.engine"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "完整体系",
              "desc": "<div class=\"markdown\"><p>根据官方文档及社区建设构建尽可能实用的知识体系，宏观掌握技术体系</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "深度分析",
              "desc": "<div class=\"markdown\"><p>尽览社区精品技术文章，将最受业界欢迎的使用方法收录其中</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "开发指南",
              "desc": "<div class=\"markdown\"><p>体系化整理，随时查阅具体技术细节，方便前端开发者日常开发</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/b3e102cd-5dad-4046-a02a-be33241d1cc7/kj9t8oji_w144_h144.png",
              "title": "API 自动生成",
              "desc": "<div class=\"markdown\"><p>可基于 TypeScript 类型定义自动生成组件 API，组件永远『表里如一』</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/3863e74a-7870-4874-b1e1-00a8cdf47684/kj9t7ww3_w144_h144.png",
              "title": "移动端组件库研发",
              "desc": "<div class=\"markdown\"><p>安装主题包即可快速启用移动端组件研发能力，内置移动端高清渲染方案</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/f093e060-726e-471c-a53e-e988ed3f560c/kj9t9sk7_w144_h144.png",
              "title": "资产数据化能力",
              "desc": "<div class=\"markdown\"><p>一行命令将组件资产数据化，标准化的资产数据可与下游生产力工具串联</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Powered by zhoubichuan</p></div>",
          "slugs": []
        },
        "title": "web-react - 📚 react 知识图谱：react、redux、react-router、umi、dva - web-react"
      },
      {
        "path": "/1.base/1.engine/create",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/create.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/create.md",
          "updatedTime": 1649010158376,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "创建项目",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "二.创建项目",
              "heading": "二创建项目"
            },
            {
              "depth": 2,
              "value": "1.创建普通 react 项目",
              "heading": "1创建普通-react-项目"
            },
            {
              "depth": 2,
              "value": "2.创建 react+ typescript 项目",
              "heading": "2创建-react-typescript-项目"
            }
          ]
        },
        "title": "创建项目 - web-react"
      },
      {
        "path": "/1.base/1.engine/dva",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/dva.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/dva.md",
          "updatedTime": 1648983936710,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "构建部署",
          "order": 24,
          "slugs": [
            {
              "depth": 1,
              "value": "十三.构建部署",
              "heading": "十三构建部署"
            }
          ]
        },
        "title": "构建部署 - web-react"
      },
      {
        "path": "/1.base/1.engine/env",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/env.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/env.md",
          "updatedTime": 1648983936601,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "环境配置",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "四.环境配置",
              "heading": "四环境配置"
            }
          ]
        },
        "title": "环境配置 - web-react"
      },
      {
        "path": "/1.base/1.engine",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/index.md",
          "updatedTime": 1649010624589,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "大纲",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "React 的工程化流程",
              "heading": "react-的工程化流程"
            },
            {
              "depth": 2,
              "value": "1.开发工具",
              "heading": "1开发工具"
            },
            {
              "depth": 2,
              "value": "2.创建项目",
              "heading": "2创建项目"
            },
            {
              "depth": 2,
              "value": "3.webpack 配置",
              "heading": "3webpack-配置"
            },
            {
              "depth": 2,
              "value": "4.环境配置",
              "heading": "4环境配置"
            },
            {
              "depth": 2,
              "value": "5.UI 框架",
              "heading": "5ui-框架"
            },
            {
              "depth": 2,
              "value": "6.页面布局",
              "heading": "6页面布局"
            },
            {
              "depth": 2,
              "value": "7.单页应用",
              "heading": "7单页应用"
            },
            {
              "depth": 2,
              "value": "8.多页应用",
              "heading": "8多页应用"
            },
            {
              "depth": 2,
              "value": "9.模板解析",
              "heading": "9模板解析"
            },
            {
              "depth": 2,
              "value": "10.编码技巧",
              "heading": "10编码技巧"
            },
            {
              "depth": 2,
              "value": "11.Mock 数据",
              "heading": "11mock-数据"
            },
            {
              "depth": 2,
              "value": "12.webpack 优化",
              "heading": "12webpack-优化"
            },
            {
              "depth": 2,
              "value": "13.构建部署",
              "heading": "13构建部署"
            }
          ]
        },
        "title": "大纲 - web-react"
      },
      {
        "path": "/1.base/1.engine/life",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/life.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/life.md",
          "updatedTime": 1648983936674,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "多页应用",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "八.多页应用",
              "heading": "八多页应用"
            }
          ]
        },
        "title": "多页应用 - web-react"
      },
      {
        "path": "/1.base/1.engine/message",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/message.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/message.md",
          "updatedTime": 1648983936674,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "配置模板",
          "order": 20,
          "slugs": [
            {
              "depth": 1,
              "value": "九.配置模板",
              "heading": "九配置模板"
            }
          ]
        },
        "title": "配置模板 - web-react"
      },
      {
        "path": "/1.base/1.engine/module",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/module.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/module.md",
          "updatedTime": 1648983936637,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "单页应用",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "七.单页应用",
              "heading": "七单页应用"
            }
          ]
        },
        "title": "单页应用 - web-react"
      },
      {
        "path": "/1.base/1.engine/project",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/project.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/project.md",
          "updatedTime": 1648983936637,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "页面布局",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "六.页面布局",
              "heading": "六页面布局"
            }
          ]
        },
        "title": "页面布局 - web-react"
      },
      {
        "path": "/1.base/1.engine/redux",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/redux.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/redux.md",
          "updatedTime": 1648983936674,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "接口联调",
          "order": 22,
          "slugs": [
            {
              "depth": 1,
              "value": "十一.接口联调",
              "heading": "十一接口联调"
            }
          ]
        },
        "title": "接口联调 - web-react"
      },
      {
        "path": "/1.base/1.engine/skill",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/skill.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/skill.md",
          "updatedTime": 1648983936674,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "编码技巧",
          "order": 21,
          "slugs": [
            {
              "depth": 1,
              "value": "十.编码技巧",
              "heading": "十编码技巧"
            }
          ]
        },
        "title": "编码技巧 - web-react"
      },
      {
        "path": "/1.base/1.engine/ui",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/ui.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/ui.md",
          "updatedTime": 1648984359440,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "UI框架",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "五.UI 框架",
              "heading": "五ui-框架"
            },
            {
              "depth": 2,
              "value": "1.antdesign",
              "heading": "1antdesign"
            },
            {
              "depth": 2,
              "value": "2.antdesignPro",
              "heading": "2antdesignpro"
            },
            {
              "depth": 3,
              "value": "1.1 工具选择",
              "heading": "11-工具选择"
            },
            {
              "depth": 3,
              "value": "1.2 技术栈选型",
              "heading": "12-技术栈选型"
            },
            {
              "depth": 4,
              "value": "1.2.1 固定化",
              "heading": "121-固定化"
            },
            {
              "depth": 4,
              "value": "1.2.2 配置化",
              "heading": "122-配置化"
            },
            {
              "depth": 5,
              "value": "1.2.2.1 编译态配置",
              "heading": "1221-编译态配置"
            },
            {
              "depth": 5,
              "value": "1.2.2.2 运行态配置",
              "heading": "1222-运行态配置"
            },
            {
              "depth": 3,
              "value": "1.3 约定化",
              "heading": "13-约定化"
            },
            {
              "depth": 3,
              "value": "1.4 理念",
              "heading": "14-理念"
            }
          ]
        },
        "title": "UI框架 - web-react"
      },
      {
        "path": "/1.base/1.engine/umi",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/umi.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/umi.md",
          "updatedTime": 1648983936692,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "项目优化",
          "order": 23,
          "slugs": [
            {
              "depth": 1,
              "value": "十二.项目优化",
              "heading": "十二项目优化"
            }
          ]
        },
        "title": "项目优化 - web-react"
      },
      {
        "path": "/1.base/1.engine/utils",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/utils.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/utils.md",
          "updatedTime": 1649010746098,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "开发工具",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "一.开发工具",
              "heading": "一开发工具"
            },
            {
              "depth": 2,
              "value": "1.Node.js",
              "heading": "1nodejs"
            },
            {
              "depth": 2,
              "value": "2.版本控制",
              "heading": "2版本控制"
            },
            {
              "depth": 3,
              "value": "2.1 安装 Git",
              "heading": "21-安装-git"
            },
            {
              "depth": 3,
              "value": "2.2 安装 TortoiseGit（git 比较好用的一个图形化工具，新手推荐用这个替代命令行）",
              "heading": "22-安装-tortoisegitgit-比较好用的一个图形化工具新手推荐用这个替代命令行"
            },
            {
              "depth": 3,
              "value": "2.3 gitlab（代码仓库）",
              "heading": "23-gitlab代码仓库"
            },
            {
              "depth": 2,
              "value": "3.编辑器",
              "heading": "3编辑器"
            },
            {
              "depth": 2,
              "value": "4.谷歌浏览器",
              "heading": "4谷歌浏览器"
            },
            {
              "depth": 2,
              "value": "5.npm",
              "heading": "5npm"
            },
            {
              "depth": 3,
              "value": "5.1 npm",
              "heading": "51-npm"
            },
            {
              "depth": 3,
              "value": "5.2 cnpm",
              "heading": "52-cnpm"
            },
            {
              "depth": 3,
              "value": "5.3 yarn",
              "heading": "53-yarn"
            },
            {
              "depth": 3,
              "value": "5.4 pnpm",
              "heading": "54-pnpm"
            }
          ]
        },
        "title": "开发工具 - web-react"
      },
      {
        "path": "/1.base/1.engine/webpack",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/1.engine/webpack.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/1.engine/webpack.md",
          "updatedTime": 1648983936601,
          "nav": {
            "title": "基本语法",
            "order": 2,
            "path": "/1.base"
          },
          "group": {
            "title": "React 的工程化流程",
            "order": 2,
            "__fallback": true,
            "path": "/1.base/1.engine"
          },
          "title": "webpack 配置",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "三.webpack 配置",
              "heading": "三webpack-配置"
            },
            {
              "depth": 2,
              "value": "1.react-app-rewired",
              "heading": "1react-app-rewired"
            },
            {
              "depth": 2,
              "value": "2.按需加载 babel-plugin-import",
              "heading": "2按需加载-babel-plugin-import"
            },
            {
              "depth": 2,
              "value": "3.安装 less",
              "heading": "3安装-less"
            },
            {
              "depth": 2,
              "value": "3.配置路径名别名",
              "heading": "3配置路径名别名"
            }
          ]
        },
        "title": "webpack 配置 - web-react"
      },
      {
        "path": "/1.base/2.manager/cli",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/cli.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/cli.md",
          "updatedTime": 1648984125316,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "项目脚手架",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "二.项目脚手架",
              "heading": "二项目脚手架"
            },
            {
              "depth": 2,
              "value": "1.HTML 部分",
              "heading": "1html-部分"
            },
            {
              "depth": 2,
              "value": "2.CSS 部分",
              "heading": "2css-部分"
            },
            {
              "depth": 3,
              "value": "2.1 不同目录中的 CSS",
              "heading": "21-不同目录中的-css"
            },
            {
              "depth": 4,
              "value": "项目中的 CSS：",
              "heading": "项目中的-css"
            },
            {
              "depth": 4,
              "value": "node_modules 中的 CSS：",
              "heading": "node_modules-中的-css"
            },
            {
              "depth": 3,
              "value": "2.2 样式变量与 mixin",
              "heading": "22-样式变量与-mixin"
            },
            {
              "depth": 2,
              "value": "3.JavaScript 部分",
              "heading": "3javascript-部分"
            },
            {
              "depth": 3,
              "value": "3.1 Babel 配置",
              "heading": "31-babel-配置"
            },
            {
              "depth": 3,
              "value": "3.2 webpack 配置",
              "heading": "32-webpack-配置"
            },
            {
              "depth": 3,
              "value": "3.3 ESLint 配置",
              "heading": "33-eslint-配置"
            },
            {
              "depth": 2,
              "value": "4.文件目录",
              "heading": "4文件目录"
            },
            {
              "depth": 4,
              "value": "redux",
              "heading": "redux"
            },
            {
              "depth": 4,
              "value": "redux-thunk",
              "heading": "redux-thunk"
            },
            {
              "depth": 4,
              "value": "redux-saga",
              "heading": "redux-saga"
            },
            {
              "depth": 2,
              "value": "5.脚手架的维护",
              "heading": "5脚手架的维护"
            }
          ]
        },
        "title": "项目脚手架 - web-react"
      },
      {
        "path": "/1.base/2.manager",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/index.md",
          "updatedTime": 1648984208993,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "大纲",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "大纲",
              "heading": "大纲"
            },
            {
              "depth": 2,
              "value": "1.项目配置",
              "heading": "1项目配置"
            },
            {
              "depth": 2,
              "value": "2.包管理工具",
              "heading": "2包管理工具"
            },
            {
              "depth": 2,
              "value": "3.登陆认证",
              "heading": "3登陆认证"
            },
            {
              "depth": 2,
              "value": "4.前端监控",
              "heading": "4前端监控"
            },
            {
              "depth": 2,
              "value": "5.前端测试",
              "heading": "5前端测试"
            },
            {
              "depth": 2,
              "value": "6.前端权限",
              "heading": "6前端权限"
            },
            {
              "depth": 2,
              "value": "7.多语言配置",
              "heading": "7多语言配置"
            },
            {
              "depth": 2,
              "value": "8.常见问题",
              "heading": "8常见问题"
            },
            {
              "depth": 2,
              "value": "9.项目优化",
              "heading": "9项目优化"
            },
            {
              "depth": 2,
              "value": "10.服务端渲染",
              "heading": "10服务端渲染"
            },
            {
              "depth": 2,
              "value": "11.PWA",
              "heading": "11pwa"
            },
            {
              "depth": 2,
              "value": "12.上传下载",
              "heading": "12上传下载"
            }
          ]
        },
        "title": "大纲 - web-react"
      },
      {
        "path": "/1.base/2.manager/init",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/init.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/init.md",
          "updatedTime": 1648984121820,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "项目配置",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "一.项目配置",
              "heading": "一项目配置"
            },
            {
              "depth": 2,
              "value": "1.使用模板进行开发 antdpro",
              "heading": "1使用模板进行开发-antdpro"
            }
          ]
        },
        "title": "项目配置 - web-react"
      },
      {
        "path": "/1.base/2.manager/language",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/language.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/language.md",
          "updatedTime": 1648984160028,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "多语言支持",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "七.多语言支持",
              "heading": "七多语言支持"
            },
            {
              "depth": 2,
              "value": "1.语言文件",
              "heading": "1语言文件"
            },
            {
              "depth": 2,
              "value": "2.解决方案",
              "heading": "2解决方案"
            },
            {
              "depth": 3,
              "value": "在应用构建过程中加载语言文件",
              "heading": "在应用构建过程中加载语言文件"
            },
            {
              "depth": 3,
              "value": "在应用初始化时读取语言文件",
              "heading": "在应用初始化时读取语言文件"
            },
            {
              "depth": 3,
              "value": "在页面中注入翻译值",
              "heading": "在页面中注入翻译值"
            }
          ]
        },
        "title": "多语言支持 - web-react"
      },
      {
        "path": "/1.base/2.manager/layout",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/layout.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/layout.md",
          "updatedTime": 1648984128732,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "页面布局",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "三.页面布局",
              "heading": "三页面布局"
            },
            {
              "depth": 2,
              "value": "1.布局与路由",
              "heading": "1布局与路由"
            },
            {
              "depth": 2,
              "value": "2.页眉 & 页脚",
              "heading": "2页眉--页脚"
            },
            {
              "depth": 3,
              "value": "配置优于代码",
              "heading": "配置优于代码"
            },
            {
              "depth": 3,
              "value": "配置式页眉",
              "heading": "配置式页眉"
            },
            {
              "depth": 3,
              "value": "页面标题",
              "heading": "页面标题"
            },
            {
              "depth": 3,
              "value": "面包屑导航",
              "heading": "面包屑导航"
            },
            {
              "depth": 2,
              "value": "3.组件与 redux",
              "heading": "3组件与-redux"
            },
            {
              "depth": 2,
              "value": "4.页面布局",
              "heading": "4页面布局"
            }
          ]
        },
        "title": "页面布局 - web-react"
      },
      {
        "path": "/1.base/2.manager/menu",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/menu.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/menu.md",
          "updatedTime": 1648984152319,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "菜单匹配",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "五.菜单匹配",
              "heading": "五菜单匹配"
            },
            {
              "depth": 2,
              "value": "1.多级菜单",
              "heading": "1多级菜单"
            },
            {
              "depth": 3,
              "value": "1.1 递归渲染父菜单及子菜单",
              "heading": "11-递归渲染父菜单及子菜单"
            },
            {
              "depth": 2,
              "value": "2.处理菜单高亮",
              "heading": "2处理菜单高亮"
            },
            {
              "depth": 2,
              "value": "2.1 记忆化（Memoization）",
              "heading": "21-记忆化memoization"
            },
            {
              "depth": 2,
              "value": "2.2 正确区分 prop 与 state",
              "heading": "22-正确区分-prop-与-state"
            }
          ]
        },
        "title": "菜单匹配 - web-react"
      },
      {
        "path": "/1.base/2.manager/message",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/message.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/message.md",
          "updatedTime": 1648984156284,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "消息通知",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "六.消息通知",
              "heading": "六消息通知"
            },
            {
              "depth": 2,
              "value": "1.全局通知栏与应用初始化",
              "heading": "1全局通知栏与应用初始化"
            },
            {
              "depth": 3,
              "value": "1.1 应用数据初始化",
              "heading": "11-应用数据初始化"
            },
            {
              "depth": 3,
              "value": "1.2 更新消息列表",
              "heading": "12-更新消息列表"
            },
            {
              "depth": 2,
              "value": "2.全局通知",
              "heading": "2全局通知"
            },
            {
              "depth": 2,
              "value": "知识点：数据驱动视图",
              "heading": "知识点数据驱动视图"
            }
          ]
        },
        "title": "消息通知 - web-react"
      },
      {
        "path": "/1.base/2.manager/next",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/next.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/next.md",
          "updatedTime": 1648984170604,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "上传下载",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "十一.上传下载",
              "heading": "十一上传下载"
            }
          ]
        },
        "title": "上传下载 - web-react"
      },
      {
        "path": "/1.base/2.manager/perm",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/perm.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/perm.md",
          "updatedTime": 1648984132045,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "权限管理",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "四.权限管理",
              "heading": "四权限管理"
            },
            {
              "depth": 2,
              "value": "1.设计策略",
              "heading": "1设计策略"
            },
            {
              "depth": 3,
              "value": "1.1 基于角色的访问控制",
              "heading": "11-基于角色的访问控制"
            },
            {
              "depth": 3,
              "value": "1.2 访问控制列表",
              "heading": "12-访问控制列表"
            },
            {
              "depth": 2,
              "value": "2.实战代码",
              "heading": "2实战代码"
            },
            {
              "depth": 3,
              "value": "2.1 路由容器",
              "heading": "21-路由容器"
            },
            {
              "depth": 3,
              "value": "2.2 权限管理",
              "heading": "22-权限管理"
            },
            {
              "depth": 2,
              "value": "3.应用集成",
              "heading": "3应用集成"
            },
            {
              "depth": 2,
              "value": "4.权限管理",
              "heading": "4权限管理"
            }
          ]
        },
        "title": "权限管理 - web-react"
      },
      {
        "path": "/1.base/2.manager/react-router",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/react-router.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/react-router.md",
          "updatedTime": 1648984167667,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "服务端渲染",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "九.服务端渲染",
              "heading": "九服务端渲染"
            }
          ]
        },
        "title": "服务端渲染 - web-react"
      },
      {
        "path": "/1.base/2.manager/saga",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/2.manager/saga.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/2.manager/saga.md",
          "updatedTime": 1648984163501,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 功能模块",
            "order": 3,
            "__fallback": true,
            "path": "/1.base/2.manager"
          },
          "title": "项目优化",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "八.项目优化",
              "heading": "八项目优化"
            }
          ]
        },
        "title": "项目优化 - web-react"
      },
      {
        "path": "/1.base/3.react/6",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/6.message.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/6.message.md",
          "updatedTime": 1648984597562,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "React-redux",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "六.React-redux",
              "heading": "六react-redux"
            }
          ]
        },
        "title": "React-redux - web-react"
      },
      {
        "path": "/1.base/3.react/class",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/class.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/class.md",
          "updatedTime": 1648984556957,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "React(类组件)",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "二.React(类组件)",
              "heading": "二react类组件"
            },
            {
              "depth": 2,
              "value": "1.组件分类",
              "heading": "1组件分类"
            },
            {
              "depth": 2,
              "value": "1.组件 & Props",
              "heading": "1组件--props"
            },
            {
              "depth": 3,
              "value": "1.1 函数组件",
              "heading": "11-函数组件"
            },
            {
              "depth": 3,
              "value": "1.2 类组件",
              "heading": "12-类组件"
            },
            {
              "depth": 3,
              "value": "1.3 组件渲染",
              "heading": "13-组件渲染"
            },
            {
              "depth": 3,
              "value": "1.4 props 的只读性",
              "heading": "14-props-的只读性"
            },
            {
              "depth": 3,
              "value": "1.5 进行类型检查",
              "heading": "15-进行类型检查"
            },
            {
              "depth": 3,
              "value": "1.6 虚拟 DOM",
              "heading": "16-虚拟-dom"
            },
            {
              "depth": 4,
              "value": "index.js",
              "heading": "indexjs"
            },
            {
              "depth": 3,
              "value": "1.7 react.js",
              "heading": "17-reactjs"
            },
            {
              "depth": 4,
              "value": "element.js",
              "heading": "elementjs"
            },
            {
              "depth": 4,
              "value": "react-dom.js",
              "heading": "react-domjs"
            },
            {
              "depth": 2,
              "value": "2.状态",
              "heading": "2状态"
            },
            {
              "depth": 3,
              "value": "2.1 不要直接修改 State",
              "heading": "21-不要直接修改-state"
            },
            {
              "depth": 3,
              "value": "2.2 State 的更新可能是异步的",
              "heading": "22-state-的更新可能是异步的"
            },
            {
              "depth": 3,
              "value": "2.3 State 的更新会被合并",
              "heading": "23-state-的更新会被合并"
            },
            {
              "depth": 3,
              "value": "2.4 数据是向下流动的",
              "heading": "24-数据是向下流动的"
            },
            {
              "depth": 2,
              "value": "3.事件处理",
              "heading": "3事件处理"
            },
            {
              "depth": 3,
              "value": "3.1 this",
              "heading": "31-this"
            },
            {
              "depth": 3,
              "value": "3.2 向事件处理程序传递参数",
              "heading": "32-向事件处理程序传递参数"
            },
            {
              "depth": 3,
              "value": "3.3 Ref",
              "heading": "33-ref"
            },
            {
              "depth": 3,
              "value": "3.4 一个简单的 hooks",
              "heading": "34-一个简单的-hooks"
            },
            {
              "depth": 3,
              "value": "3.5 React 为什么要搞一个 Hooks",
              "heading": "35-react-为什么要搞一个-hooks"
            },
            {
              "depth": 4,
              "value": "想要复用一个有状态的组件太麻烦了",
              "heading": "想要复用一个有状态的组件太麻烦了"
            },
            {
              "depth": 4,
              "value": "生命周期钩子函数里的逻辑太乱了",
              "heading": "生命周期钩子函数里的逻辑太乱了"
            },
            {
              "depth": 4,
              "value": "calss 真的太让人困惑了",
              "heading": "calss-真的太让人困惑了"
            },
            {
              "depth": 4,
              "value": "什么是 State Hooks",
              "heading": "什么是-state-hooks"
            }
          ]
        },
        "title": "React(类组件) - web-react"
      },
      {
        "path": "/1.base/3.react/cli",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/cli.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/cli.md",
          "updatedTime": 1648984540741,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "React(生命周期)",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "二.React(生命周期)",
              "heading": "二react生命周期"
            },
            {
              "depth": 2,
              "value": "1.初始化阶段",
              "heading": "1初始化阶段"
            },
            {
              "depth": 3,
              "value": "1.1 设置组件的默认属性",
              "heading": "11-设置组件的默认属性"
            },
            {
              "depth": 3,
              "value": "1.2 设置组件的初始化状态",
              "heading": "12-设置组件的初始化状态"
            },
            {
              "depth": 3,
              "value": "1.3 componentWillMount()",
              "heading": "13-componentwillmount"
            },
            {
              "depth": 3,
              "value": "1.4 render()",
              "heading": "14-render"
            },
            {
              "depth": 3,
              "value": "1.5 componentDidMount()",
              "heading": "15-componentdidmount"
            },
            {
              "depth": 2,
              "value": "2.运行中阶段",
              "heading": "2运行中阶段"
            },
            {
              "depth": 3,
              "value": "2.1 componentWillReceiveProps()",
              "heading": "21-componentwillreceiveprops"
            },
            {
              "depth": 3,
              "value": "2.2 shouldComponentUpdate()",
              "heading": "22-shouldcomponentupdate"
            },
            {
              "depth": 3,
              "value": "2.3 componentWillUpdate()",
              "heading": "23-componentwillupdate"
            },
            {
              "depth": 3,
              "value": "2.4 componentDidUpdate()",
              "heading": "24-componentdidupdate"
            },
            {
              "depth": 2,
              "value": "3.销毁阶段",
              "heading": "3销毁阶段"
            },
            {
              "depth": 3,
              "value": "3.1 componentWillUnmount()",
              "heading": "31-componentwillunmount"
            }
          ]
        },
        "title": "React(生命周期) - web-react"
      },
      {
        "path": "/1.base/3.react/function",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/function.md",
          "updatedTime": 1648984566135,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "React(函数组件)",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "二.React(函数组件)",
              "heading": "二react函数组件"
            },
            {
              "depth": 2,
              "value": "1.什么是 React",
              "heading": "1什么是-react"
            },
            {
              "depth": 2,
              "value": "2.组件化的概念",
              "heading": "2组件化的概念"
            },
            {
              "depth": 3,
              "value": "我们可以很直观的将一个复杂的页面分割成若干个独立的组件，每个组件包含自己的逻辑和样式，在将这些独立的组件完成一个复杂的页面，这样既减少了逻辑复杂度，又实现了代码的重用",
              "heading": "我们可以很直观的将一个复杂的页面分割成若干个独立的组件每个组件包含自己的逻辑和样式在将这些独立的组件完成一个复杂的页面这样既减少了逻辑复杂度又实现了代码的重用"
            },
            {
              "depth": 2,
              "value": "3.react 开发环境",
              "heading": "3react-开发环境"
            },
            {
              "depth": 3,
              "value": "1.用 react 脚手架快速搭建项目",
              "heading": "1用-react-脚手架快速搭建项目"
            },
            {
              "depth": 2,
              "value": "4.jsx",
              "heading": "4jsx"
            },
            {
              "depth": 2,
              "value": "5.createElement",
              "heading": "5createelement"
            },
            {
              "depth": 2,
              "value": "6.react 元素/jsx 元素",
              "heading": "6react-元素jsx-元素"
            },
            {
              "depth": 2,
              "value": "7.模拟 render 实现",
              "heading": "7模拟-render-实现"
            },
            {
              "depth": 2,
              "value": "8.jsx 表达式的用法",
              "heading": "8jsx-表达式的用法"
            },
            {
              "depth": 2,
              "value": "9.jsx 属性",
              "heading": "9jsx-属性"
            },
            {
              "depth": 2,
              "value": "10.组件的特点声明方式",
              "heading": "10组件的特点声明方式"
            },
            {
              "depth": 2,
              "value": "11.组件的两种定义方式",
              "heading": "11组件的两种定义方式"
            },
            {
              "depth": 2,
              "value": "12.组件中属性和状态的区别",
              "heading": "12组件中属性和状态的区别"
            },
            {
              "depth": 2,
              "value": "13.绑定事件",
              "heading": "13绑定事件"
            },
            {
              "depth": 2,
              "value": "14.属性校验，默认属性",
              "heading": "14属性校验默认属性"
            },
            {
              "depth": 2,
              "value": "15.状态的使用",
              "heading": "15状态的使用"
            },
            {
              "depth": 2,
              "value": "16.复合组件",
              "heading": "16复合组件"
            },
            {
              "depth": 2,
              "value": "17.受控组件和非受控组件",
              "heading": "17受控组件和非受控组件"
            },
            {
              "depth": 2,
              "value": "1.React 生命周期",
              "heading": "1react-生命周期"
            },
            {
              "depth": 2,
              "value": "2.使用 PropTypes 进行类型检查",
              "heading": "2使用-proptypes-进行类型检查"
            },
            {
              "depth": 2,
              "value": "3.性能优化",
              "heading": "3性能优化"
            },
            {
              "depth": 2,
              "value": "4.使用 Chrome 性能分析工具",
              "heading": "4使用-chrome-性能分析工具"
            },
            {
              "depth": 2,
              "value": "5.避免重复渲染",
              "heading": "5避免重复渲染"
            },
            {
              "depth": 2,
              "value": "6.Reconciliation",
              "heading": "6reconciliation"
            },
            {
              "depth": 2,
              "value": "7.上下文",
              "heading": "7上下文"
            },
            {
              "depth": 2,
              "value": "8.片段",
              "heading": "8片段"
            },
            {
              "depth": 2,
              "value": "9.插槽",
              "heading": "9插槽"
            },
            {
              "depth": 2,
              "value": "10.错误边界",
              "heading": "10错误边界"
            },
            {
              "depth": 2,
              "value": "11.高阶组件",
              "heading": "11高阶组件"
            },
            {
              "depth": 2,
              "value": "1.React 路由",
              "heading": "1react-路由"
            },
            {
              "depth": 2,
              "value": "2.跑通路由",
              "heading": "2跑通路由"
            },
            {
              "depth": 2,
              "value": "3.实现基本路由",
              "heading": "3实现基本路由"
            },
            {
              "depth": 2,
              "value": "4.path-to-regexp",
              "heading": "4path-to-regexp"
            },
            {
              "depth": 2,
              "value": "5.正则匹配路径",
              "heading": "5正则匹配路径"
            },
            {
              "depth": 2,
              "value": "6.exact 精确匹配",
              "heading": "6exact-精确匹配"
            },
            {
              "depth": 2,
              "value": "7.Link",
              "heading": "7link"
            },
            {
              "depth": 2,
              "value": "8.Redirect && Switch",
              "heading": "8redirect--switch"
            },
            {
              "depth": 2,
              "value": "9.页面跳转",
              "heading": "9页面跳转"
            },
            {
              "depth": 2,
              "value": "10.受保护的路由",
              "heading": "10受保护的路由"
            },
            {
              "depth": 2,
              "value": "11.自定义导航",
              "heading": "11自定义导航"
            },
            {
              "depth": 2,
              "value": "12.防止跳转",
              "heading": "12防止跳转"
            }
          ]
        },
        "title": "React(函数组件) - web-react"
      },
      {
        "path": "/1.base/3.react/hooks",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/hooks.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/hooks.md",
          "updatedTime": 1648984576005,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "React(hooks)",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "二.React(hooks)",
              "heading": "二reacthooks"
            },
            {
              "depth": 2,
              "value": "1.useState",
              "heading": "1usestate"
            },
            {
              "depth": 3,
              "value": "1.1 使用",
              "heading": "11-使用"
            },
            {
              "depth": 3,
              "value": "1.2 实现",
              "heading": "12-实现"
            },
            {
              "depth": 2,
              "value": "2.多 useState",
              "heading": "2多-usestate"
            },
            {
              "depth": 3,
              "value": "2.1 使用",
              "heading": "21-使用"
            },
            {
              "depth": 3,
              "value": "2.2 实现",
              "heading": "22-实现"
            },
            {
              "depth": 2,
              "value": "3.useEffect",
              "heading": "3useeffect"
            },
            {
              "depth": 3,
              "value": "3.1 使用",
              "heading": "31-使用"
            },
            {
              "depth": 3,
              "value": "3.2 实现",
              "heading": "32-实现"
            },
            {
              "depth": 2,
              "value": "4.useLayoutEffect",
              "heading": "4uselayouteffect"
            },
            {
              "depth": 3,
              "value": "4.1 使用",
              "heading": "41-使用"
            },
            {
              "depth": 3,
              "value": "4.2 实现",
              "heading": "42-实现"
            },
            {
              "depth": 2,
              "value": "5.useContext",
              "heading": "5usecontext"
            },
            {
              "depth": 3,
              "value": "5.1 使用",
              "heading": "51-使用"
            },
            {
              "depth": 3,
              "value": "5.2 实现",
              "heading": "52-实现"
            },
            {
              "depth": 2,
              "value": "6.useReducer",
              "heading": "6usereducer"
            },
            {
              "depth": 3,
              "value": "6.1 使用",
              "heading": "61-使用"
            },
            {
              "depth": 3,
              "value": "6.2 实现",
              "heading": "62-实现"
            },
            {
              "depth": 2,
              "value": "7.useMemo",
              "heading": "7usememo"
            },
            {
              "depth": 3,
              "value": "7.1 使用",
              "heading": "71-使用"
            },
            {
              "depth": 3,
              "value": "7.2 实现",
              "heading": "72-实现"
            },
            {
              "depth": 2,
              "value": "8.useCallback",
              "heading": "8usecallback"
            },
            {
              "depth": 3,
              "value": "8.1 使用",
              "heading": "81-使用"
            },
            {
              "depth": 3,
              "value": "8.2 实现",
              "heading": "82-实现"
            }
          ]
        },
        "title": "React(hooks) - web-react"
      },
      {
        "path": "/1.base/3.react",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/index.md",
          "updatedTime": 1648984477908,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "大纲",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "React 17.x 全家桶",
              "heading": "react-17x-全家桶"
            },
            {
              "depth": 2,
              "value": "1.脚手架",
              "heading": "1脚手架"
            },
            {
              "depth": 2,
              "value": "2.React 17.x 全家桶",
              "heading": "2react-17x-全家桶"
            },
            {
              "depth": 2,
              "value": "3.UI 组件库",
              "heading": "3ui-组件库"
            },
            {
              "depth": 2,
              "value": "4.工具类",
              "heading": "4工具类"
            },
            {
              "depth": 2,
              "value": "5.css 预处理器",
              "heading": "5css-预处理器"
            },
            {
              "depth": 2,
              "value": "6.代码校验",
              "heading": "6代码校验"
            }
          ]
        },
        "title": "大纲 - web-react"
      },
      {
        "path": "/1.base/3.react/init",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/init.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/init.md",
          "updatedTime": 1648984531864,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "create-react-app",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "一.create-react-app",
              "heading": "一create-react-app"
            }
          ]
        },
        "title": "create-react-app - web-react"
      },
      {
        "path": "/1.base/3.react/language",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/language.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/language.md",
          "updatedTime": 1648984612164,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "Ant-design",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "七.Ant-design",
              "heading": "七ant-design"
            }
          ]
        },
        "title": "Ant-design - web-react"
      },
      {
        "path": "/1.base/3.react/menu",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/menu.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/menu.md",
          "updatedTime": 1648984590202,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "React-router",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "五.React-router",
              "heading": "五react-router"
            }
          ]
        },
        "title": "React-router - web-react"
      },
      {
        "path": "/1.base/3.react/message",
        "component": require('/Users/zhoubichuan/Web-React/docs/1.base/3.react/message.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/1.base/3.react/message.md",
          "updatedTime": 1648984548572,
          "nav": {
            "title": "基本语法",
            "order": 1,
            "path": "/1.base"
          },
          "group": {
            "title": "React 17.x 全家桶",
            "order": 4,
            "__fallback": true,
            "path": "/1.base/3.react"
          },
          "title": "React(组件间通信)",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "二.React(组件间通信)",
              "heading": "二react组件间通信"
            },
            {
              "depth": 2,
              "value": "1.父组件向子组件通信",
              "heading": "1父组件向子组件通信"
            },
            {
              "depth": 2,
              "value": "2.子组件向父组件通信",
              "heading": "2子组件向父组件通信"
            },
            {
              "depth": 2,
              "value": "3.跨级组件通信",
              "heading": "3跨级组件通信"
            },
            {
              "depth": 2,
              "value": "4.非嵌套组件通信",
              "heading": "4非嵌套组件通信"
            }
          ]
        },
        "title": "React(组件间通信) - web-react"
      },
      {
        "path": "/2.senior/1.component/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/1.recursion.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/1.recursion.md",
          "updatedTime": 1649002901544,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "递归组件",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "一.递归组件",
              "heading": "一递归组件"
            },
            {
              "depth": 2,
              "value": "3.使用场景",
              "heading": "3使用场景"
            }
          ]
        },
        "title": "递归组件 - web-react"
      },
      {
        "path": "/2.senior/1.component/10",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/10.renderTable.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/10.renderTable.md",
          "updatedTime": 1649002987301,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "表格组件",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "十.Render 表格组件",
              "heading": "十render-表格组件"
            }
          ]
        },
        "title": "表格组件 - web-react"
      },
      {
        "path": "/2.senior/1.component/11",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/11.slotScopeTable.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/11.slotScopeTable.md",
          "updatedTime": 1649003002967,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "表格组件2",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "十一.表格组件",
              "heading": "十一表格组件"
            }
          ]
        },
        "title": "表格组件2 - web-react"
      },
      {
        "path": "/2.senior/1.component/12",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/12.tree.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/12.tree.md",
          "updatedTime": 1649003016360,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "tree",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "十二.tree",
              "heading": "十二tree"
            }
          ]
        },
        "title": "tree - web-react"
      },
      {
        "path": "/2.senior/1.component/2",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/2.dynamics.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/2.dynamics.md",
          "updatedTime": 1649002910838,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "dynamics",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "二.dynamics",
              "heading": "二dynamics"
            }
          ]
        },
        "title": "dynamics - web-react"
      },
      {
        "path": "/2.senior/1.component/3",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/3.extend.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/3.extend.md",
          "updatedTime": 1649002919058,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "extend",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "二.extend",
              "heading": "二extend"
            }
          ]
        },
        "title": "extend - web-react"
      },
      {
        "path": "/2.senior/1.component/4",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/4.render.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/4.render.md",
          "updatedTime": 1649002927750,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "render",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "四.render",
              "heading": "四render"
            }
          ]
        },
        "title": "render - web-react"
      },
      {
        "path": "/2.senior/1.component/5",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/5.api.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/5.api.md",
          "updatedTime": 1649002938767,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "大纲1",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "五.React 相关 API 详解",
              "heading": "五react-相关-api-详解"
            }
          ]
        },
        "title": "大纲1 - web-react"
      },
      {
        "path": "/2.senior/1.component/6",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/6.form.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/6.form.md",
          "updatedTime": 1649002947687,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "form",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "六.form",
              "heading": "六form"
            }
          ]
        },
        "title": "form - web-react"
      },
      {
        "path": "/2.senior/1.component/7",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/7.checkBox.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/7.checkBox.md",
          "updatedTime": 1649002960503,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "checkbox",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "七.checkbox",
              "heading": "七checkbox"
            }
          ]
        },
        "title": "checkbox - web-react"
      },
      {
        "path": "/2.senior/1.component/8",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/8.dispaly.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/8.dispaly.md",
          "updatedTime": 1649002970942,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "display",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "八.display",
              "heading": "八display"
            }
          ]
        },
        "title": "display - web-react"
      },
      {
        "path": "/2.senior/1.component/9",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/9.alert.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/9.alert.md",
          "updatedTime": 1649002978351,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "alert",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "九.alert",
              "heading": "九alert"
            }
          ]
        },
        "title": "alert - web-react"
      },
      {
        "path": "/2.senior/1.component",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/1.component/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/1.component/index.md",
          "updatedTime": 1649003038761,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "组件开发",
            "order": 1,
            "__fallback": true,
            "path": "/2.senior/1.component"
          },
          "title": "大纲",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "组件开发",
              "heading": "组件开发"
            },
            {
              "depth": 2,
              "value": "1.递归组件",
              "heading": "1递归组件"
            },
            {
              "depth": 2,
              "value": "2.动态组件",
              "heading": "2动态组件"
            },
            {
              "depth": 2,
              "value": "3.",
              "heading": "3"
            },
            {
              "depth": 2,
              "value": "4.",
              "heading": "4"
            },
            {
              "depth": 2,
              "value": "5.",
              "heading": "5"
            },
            {
              "depth": 2,
              "value": "6.表格组件",
              "heading": "6表格组件"
            },
            {
              "depth": 2,
              "value": "7.多选框组件",
              "heading": "7多选框组件"
            },
            {
              "depth": 2,
              "value": "8.动态渲染组件",
              "heading": "8动态渲染组件"
            },
            {
              "depth": 2,
              "value": "9.弹框组件",
              "heading": "9弹框组件"
            },
            {
              "depth": 2,
              "value": "10.",
              "heading": "10"
            },
            {
              "depth": 2,
              "value": "11.",
              "heading": "11"
            },
            {
              "depth": 2,
              "value": "12.树组件",
              "heading": "12树组件"
            }
          ]
        },
        "title": "大纲 - web-react"
      },
      {
        "path": "/2.senior/2.typescript/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/2.typescript/1.index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/2.typescript/1.index.md",
          "updatedTime": 1649004475927,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "TypeScript",
            "order": 2,
            "__fallback": true,
            "path": "/2.senior/2.typescript"
          },
          "title": "TypeScript",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "React + TypeScript",
              "heading": "react--typescript"
            },
            {
              "depth": 2,
              "value": "1.TypeScript 工程化开发",
              "heading": "1typescript-工程化开发"
            },
            {
              "depth": 2,
              "value": "2.初始化项目",
              "heading": "2初始化项目"
            },
            {
              "depth": 2,
              "value": "3.git 规范和 changelog",
              "heading": "3git-规范和-changelog"
            },
            {
              "depth": 3,
              "value": "3.1 良好的 git commit 好处",
              "heading": "31-良好的-git-commit-好处"
            },
            {
              "depth": 3,
              "value": "3.2 良好的 commit",
              "heading": "32-良好的-commit"
            },
            {
              "depth": 3,
              "value": "3.3 .gitignore",
              "heading": "33-gitignore"
            },
            {
              "depth": 3,
              "value": "3.4 提交的格式",
              "heading": "34-提交的格式"
            },
            {
              "depth": 3,
              "value": "3.4 husky",
              "heading": "34-husky"
            },
            {
              "depth": 3,
              "value": "3.5 生成 CHANGELOG.md",
              "heading": "35-生成-changelogmd"
            },
            {
              "depth": 2,
              "value": "4.支持 Typescript",
              "heading": "4支持-typescript"
            }
          ]
        },
        "title": "TypeScript - web-react"
      },
      {
        "path": "/2.senior/3.dva/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/3.dva/1.index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/3.dva/1.index.md",
          "updatedTime": 1649004507613,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "dva",
            "order": 3,
            "__fallback": true,
            "path": "/2.senior/3.dva"
          },
          "title": "dva",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "dva",
              "heading": "dva"
            },
            {
              "depth": 2,
              "value": "1.dva 介绍",
              "heading": "1dva-介绍"
            },
            {
              "depth": 3,
              "value": "1.1 前置知识",
              "heading": "11-前置知识"
            },
            {
              "depth": 2,
              "value": "2.初始化项目",
              "heading": "2初始化项目"
            },
            {
              "depth": 2,
              "value": "3.基本计数器",
              "heading": "3基本计数器"
            },
            {
              "depth": 3,
              "value": "3.1 使用",
              "heading": "31-使用"
            },
            {
              "depth": 4,
              "value": "3.1.1 index.js",
              "heading": "311-indexjs"
            }
          ]
        },
        "title": "dva - web-react"
      },
      {
        "path": "/2.senior/4.umi/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/4.umi/1.index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/4.umi/1.index.md",
          "updatedTime": 1649004589409,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "umi",
            "order": 4,
            "__fallback": true,
            "path": "/2.senior/4.umi"
          },
          "title": "umi",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "umi",
              "heading": "umi"
            }
          ]
        },
        "title": "umi - web-react"
      },
      {
        "path": "/2.senior/5.use/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/5.use/1.index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/5.use/1.index.md",
          "updatedTime": 1649004613692,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "项目优化",
            "order": 5,
            "__fallback": true,
            "path": "/2.senior/5.use"
          },
          "title": "项目优化",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "一.项目优化",
              "heading": "一项目优化"
            },
            {
              "depth": 2,
              "value": "1.编译阶段优化",
              "heading": "1编译阶段优化"
            },
            {
              "depth": 2,
              "value": "2.路由切换优化",
              "heading": "2路由切换优化"
            },
            {
              "depth": 2,
              "value": "3.更新阶段优化",
              "heading": "3更新阶段优化"
            },
            {
              "depth": 2,
              "value": "4.大数据渲染",
              "heading": "4大数据渲染"
            },
            {
              "depth": 2,
              "value": "5.React 性能分析",
              "heading": "5react-性能分析"
            },
            {
              "depth": 2,
              "value": "6.其他性能优化",
              "heading": "6其他性能优化"
            }
          ]
        },
        "title": "项目优化 - web-react"
      },
      {
        "path": "/2.senior/5.use/2",
        "component": require('/Users/zhoubichuan/Web-React/docs/2.senior/5.use/2.extend.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/2.senior/5.use/2.extend.md",
          "updatedTime": 1649004640198,
          "nav": {
            "title": "高级知识",
            "order": 2,
            "path": "/2.senior"
          },
          "group": {
            "title": "测试方式",
            "order": 6,
            "__fallback": true,
            "path": "/2.senior/5.use"
          },
          "title": "测试方式",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "二.测试方式",
              "heading": "二测试方式"
            },
            {
              "depth": 2,
              "value": "1.为什么需要测试",
              "heading": "1为什么需要测试"
            },
            {
              "depth": 3,
              "value": "1.1 创建项目",
              "heading": "11-创建项目"
            },
            {
              "depth": 3,
              "value": "1.2 手工测试",
              "heading": "12-手工测试"
            },
            {
              "depth": 3,
              "value": "1.3 断言",
              "heading": "13-断言"
            },
            {
              "depth": 3,
              "value": "1.4 测试框架",
              "heading": "14-测试框架"
            },
            {
              "depth": 2,
              "value": "5.Jest",
              "heading": "5jest"
            },
            {
              "depth": 2,
              "value": "5.1 安装",
              "heading": "51-安装"
            },
            {
              "depth": 2,
              "value": "5.2 初体验",
              "heading": "52-初体验"
            },
            {
              "depth": 2,
              "value": "5.3 测试覆盖率",
              "heading": "53-测试覆盖率"
            },
            {
              "depth": 2,
              "value": "5.4 配置",
              "heading": "54-配置"
            },
            {
              "depth": 3,
              "value": "5.4.1 生成配置文件",
              "heading": "541-生成配置文件"
            },
            {
              "depth": 3,
              "value": "5.4.2 babel.config.js",
              "heading": "542-babelconfigjs"
            },
            {
              "depth": 3,
              "value": "5.4.3 jest.config.js",
              "heading": "543-jestconfigjs"
            },
            {
              "depth": 3,
              "value": "5.4.4 tsconfig.json",
              "heading": "544-tsconfigjson"
            },
            {
              "depth": 3,
              "value": "5.5 Matchers",
              "heading": "55-matchers"
            },
            {
              "depth": 3,
              "value": "5.5.1 matches.tsx",
              "heading": "551-matchestsx"
            },
            {
              "depth": 2,
              "value": "5.6 测试 DOM",
              "heading": "56-测试-dom"
            },
            {
              "depth": 3,
              "value": "5.6.1 src\\domUtils.tsx",
              "heading": "561-srcdomutilstsx"
            },
            {
              "depth": 3,
              "value": "5.6.2 tests\\domUtils.tsx",
              "heading": "562-testsdomutilstsx"
            },
            {
              "depth": 2,
              "value": "5.7 异步请求",
              "heading": "57-异步请求"
            },
            {
              "depth": 3,
              "value": "5.7.1 src\\api.tsxsrc\\api.tsx",
              "heading": "571-srcapitsxsrcapitsx"
            },
            {
              "depth": 3,
              "value": "5.7.2 tests\\api.tsx",
              "heading": "572-testsapitsx"
            },
            {
              "depth": 3,
              "value": "5.8 钩子函数",
              "heading": "58-钩子函数"
            },
            {
              "depth": 3,
              "value": "5.9 mock",
              "heading": "59-mock"
            },
            {
              "depth": 3,
              "value": "5.9.1 src\\mock.tsx",
              "heading": "591-srcmocktsx"
            },
            {
              "depth": 3,
              "value": "5.9.2 tests\\mock.tsx",
              "heading": "592-testsmocktsx"
            },
            {
              "depth": 2,
              "value": "6. TDD(Test-Driven-Development)",
              "heading": "6-tddtest-driven-development"
            },
            {
              "depth": 3,
              "value": "6.1 创建项目",
              "heading": "61-创建项目"
            },
            {
              "depth": 3,
              "value": "6.2 环境准备",
              "heading": "62-环境准备"
            },
            {
              "depth": 3,
              "value": "6.2.1 src\\react-app-env.d.ts",
              "heading": "621-srcreact-app-envdts"
            },
            {
              "depth": 3,
              "value": "6.2.2 src\\setupTests.ts",
              "heading": "622-srcsetupteststs"
            },
            {
              "depth": 3,
              "value": "6.2.3 tsconfig.json",
              "heading": "623-tsconfigjson"
            },
            {
              "depth": 3,
              "value": "6.3 Message.tsx",
              "heading": "63-messagetsx"
            },
            {
              "depth": 3,
              "value": "6.3.1 测试用例",
              "heading": "631-测试用例"
            },
            {
              "depth": 3,
              "value": "6.3.2 重构实现",
              "heading": "632-重构实现"
            },
            {
              "depth": 2,
              "value": "6.4 MessageList.tsx",
              "heading": "64-messagelisttsx"
            },
            {
              "depth": 3,
              "value": "6.4.1 测试用例",
              "heading": "641-测试用例"
            },
            {
              "depth": 3,
              "value": "6.4.2 重构实现",
              "heading": "642-重构实现"
            },
            {
              "depth": 3,
              "value": "6.5 MessageForm.tsx",
              "heading": "65-messageformtsx"
            },
            {
              "depth": 3,
              "value": "6.5.1 测试用例",
              "heading": "651-测试用例"
            },
            {
              "depth": 3,
              "value": "6.5.2 重构实现",
              "heading": "652-重构实现"
            },
            {
              "depth": 3,
              "value": "6.6 MessageApp.tsx",
              "heading": "66-messageapptsx"
            },
            {
              "depth": 3,
              "value": "6.6.1 测试用例",
              "heading": "661-测试用例"
            },
            {
              "depth": 3,
              "value": "6.5.2 重构实现",
              "heading": "652-重构实现-1"
            },
            {
              "depth": 2,
              "value": "7. BDD(Behavior Driven Development)",
              "heading": "7-bddbehavior-driven-development"
            },
            {
              "depth": 3,
              "value": "7.1 创建项目",
              "heading": "71-创建项目"
            },
            {
              "depth": 3,
              "value": "7.2 环境准备",
              "heading": "72-环境准备"
            },
            {
              "depth": 3,
              "value": "7.2.1 src\\react-app-env.d.ts",
              "heading": "721-srcreact-app-envdts"
            },
            {
              "depth": 3,
              "value": "7.3 开发功能",
              "heading": "73-开发功能"
            },
            {
              "depth": 3,
              "value": "7.3.1 index.tsx",
              "heading": "731-indextsx"
            },
            {
              "depth": 3,
              "value": "7.3.2 containers\\App.tsx",
              "heading": "732-containersapptsx"
            },
            {
              "depth": 3,
              "value": "7.3.3 components\\Counter1.tsx",
              "heading": "733-componentscounter1tsx"
            },
            {
              "depth": 3,
              "value": "7.3.4 components\\Counter2.tsx",
              "heading": "734-componentscounter2tsx"
            },
            {
              "depth": 3,
              "value": "7.3.5 components\\Header.tsx",
              "heading": "735-componentsheadertsx"
            },
            {
              "depth": 3,
              "value": "7.3.6 store\\index.tsx",
              "heading": "736-storeindextsx"
            },
            {
              "depth": 3,
              "value": "7.3.7 store\\action-types.tsx",
              "heading": "737-storeaction-typestsx"
            },
            {
              "depth": 3,
              "value": "7.3.8 store\\reducers\\index.tsx",
              "heading": "738-storereducersindextsx"
            },
            {
              "depth": 3,
              "value": "7.3.9 store\\reducers\\counter1.tsx",
              "heading": "739-storereducerscounter1tsx"
            },
            {
              "depth": 3,
              "value": "7.3.10 store\\reducers\\counter2.tsx",
              "heading": "7310-storereducerscounter2tsx"
            },
            {
              "depth": 3,
              "value": "7.3.11 store\\actions\\counter1.tsx",
              "heading": "7311-storeactionscounter1tsx"
            },
            {
              "depth": 3,
              "value": "7.3.12 store\\actions\\counter2.tsx",
              "heading": "7312-storeactionscounter2tsx"
            },
            {
              "depth": 3,
              "value": "7.3.13 index.html",
              "heading": "7313-indexhtml"
            },
            {
              "depth": 3,
              "value": "7.4 编写测试用例",
              "heading": "74-编写测试用例"
            },
            {
              "depth": 3,
              "value": "7.4.1 reducers\\counter1.spec.tsx",
              "heading": "741-reducerscounter1spectsx"
            },
            {
              "depth": 3,
              "value": "7.4.2 actions\\counter1.spec.tsx",
              "heading": "742-actionscounter1spectsx"
            },
            {
              "depth": 3,
              "value": "7.4.3 store\\store.spec.ts",
              "heading": "743-storestorespects"
            },
            {
              "depth": 3,
              "value": "7.4.4 tests\\containers\\Counter1.tsx",
              "heading": "744-testscontainerscounter1tsx"
            },
            {
              "depth": 3,
              "value": "7.4.5 tests\\containers\\App.tsx",
              "heading": "745-testscontainersapptsx"
            },
            {
              "depth": 2,
              "value": "8. UI 测试",
              "heading": "8-ui-测试"
            },
            {
              "depth": 3,
              "value": "8.1 puppeteer",
              "heading": "81-puppeteer"
            },
            {
              "depth": 3,
              "value": "8.2 jest-puppeteer",
              "heading": "82-jest-puppeteer"
            },
            {
              "depth": 3,
              "value": "8.2.1 jest.config.js",
              "heading": "821-jestconfigjs"
            },
            {
              "depth": 3,
              "value": "8.2.2 CounterApp.ts",
              "heading": "822-counterappts"
            }
          ]
        },
        "title": "测试方式 - web-react"
      },
      {
        "path": "/3.source/1.react/preparation",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/1.react/preparation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/1.react/preparation.md",
          "updatedTime": 1649003533926,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react",
            "order": 1,
            "__fallback": true,
            "path": "/3.source/1.react"
          },
          "title": "react",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "react",
              "heading": "react"
            },
            {
              "depth": 2,
              "value": "Children",
              "heading": "children"
            },
            {
              "depth": 3,
              "value": "map",
              "heading": "map"
            },
            {
              "depth": 3,
              "value": "forEach",
              "heading": "foreach"
            },
            {
              "depth": 3,
              "value": "count",
              "heading": "count"
            },
            {
              "depth": 3,
              "value": "toArray",
              "heading": "toarray"
            },
            {
              "depth": 3,
              "value": "only",
              "heading": "only"
            },
            {
              "depth": 2,
              "value": "createRef",
              "heading": "createref"
            },
            {
              "depth": 2,
              "value": "Component",
              "heading": "component"
            },
            {
              "depth": 2,
              "value": "PureComponent",
              "heading": "purecomponent"
            },
            {
              "depth": 2,
              "value": "createContext",
              "heading": "createcontext"
            },
            {
              "depth": 2,
              "value": "forwardRef",
              "heading": "forwardref"
            },
            {
              "depth": 2,
              "value": "lazy",
              "heading": "lazy"
            },
            {
              "depth": 2,
              "value": "memo",
              "heading": "memo"
            }
          ]
        },
        "title": "react - web-react"
      },
      {
        "path": "/3.source/2.react-dom/react-root",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/ReactRoot.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/ReactRoot.md",
          "updatedTime": 1649003731078,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "创建root",
          "order": 2,
          "slugs": [
            {
              "depth": 1,
              "value": "创建 root",
              "heading": "创建-root"
            },
            {
              "depth": 2,
              "value": "root",
              "heading": "root"
            },
            {
              "depth": 2,
              "value": "RootFiber 和 FiberRoot",
              "heading": "rootfiber-和-fiberroot"
            }
          ]
        },
        "title": "创建root - web-react"
      },
      {
        "path": "/3.source/2.react-dom/update-queue",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/UpdateQueue.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/UpdateQueue.md",
          "updatedTime": 1649003724546,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "创建 root（更新队列）",
          "order": 5,
          "slugs": [
            {
              "depth": 1,
              "value": "创建 root（更新队列）",
              "heading": "创建-root更新队列"
            }
          ]
        },
        "title": "创建 root（更新队列） - web-react"
      },
      {
        "path": "/3.source/2.react-dom/commit-all-host-effects",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/commitAllHostEffects.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/commitAllHostEffects.md",
          "updatedTime": 1649003871602,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "提交 root（dom 更新中）",
          "order": 12,
          "slugs": [
            {
              "depth": 1,
              "value": "提交 root（dom 更新中）",
              "heading": "提交-rootdom-更新中"
            }
          ]
        },
        "title": "提交 root（dom 更新中） - web-react"
      },
      {
        "path": "/3.source/2.react-dom/commit-root",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/commitRoot.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/commitRoot.md",
          "updatedTime": 1649003837808,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "提交 root",
          "order": 10,
          "slugs": [
            {
              "depth": 1,
              "value": "提交 root",
              "heading": "提交-root"
            },
            {
              "depth": 2,
              "value": "3.1 commitBeforeMutationLifecycles",
              "heading": "31-commitbeforemutationlifecycles"
            },
            {
              "depth": 2,
              "value": "3.2 commitAllHostEffects",
              "heading": "32-commitallhosteffects"
            },
            {
              "depth": 2,
              "value": "3.3 commitAllLifeCycles",
              "heading": "33-commitalllifecycles"
            }
          ]
        },
        "title": "提交 root - web-react"
      },
      {
        "path": "/3.source/2.react-dom/create-work-in-progress",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/createWorkInProgress.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/createWorkInProgress.md",
          "updatedTime": 1649003780818,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "创建root",
          "order": 7,
          "slugs": [
            {
              "depth": 1,
              "value": "渲染 root（工作单元）",
              "heading": "渲染-root工作单元"
            }
          ]
        },
        "title": "创建root - web-react"
      },
      {
        "path": "/3.source/2.react-dom/expiration-time",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/expirationTime.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/expirationTime.md",
          "updatedTime": 1649003720915,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "创建root（优先级）",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "创建 root（优先级）",
              "heading": "创建-root优先级"
            }
          ]
        },
        "title": "创建root（优先级） - web-react"
      },
      {
        "path": "/3.source/2.react-dom/lcommit-all-life-cycles",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/lcommitAllLifeCycles.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/lcommitAllLifeCycles.md",
          "updatedTime": 1649003913892,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "提交 root（dom 更新后）",
          "order": 13,
          "slugs": [
            {
              "depth": 1,
              "value": "提交 root（dom 更新后）",
              "heading": "提交-rootdom-更新后"
            }
          ]
        },
        "title": "提交 root（dom 更新后） - web-react"
      },
      {
        "path": "/3.source/2.react-dom/lcommit-before-mutation-lifecycles",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/lcommitBeforeMutationLifecycles.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/lcommitBeforeMutationLifecycles.md",
          "updatedTime": 1649003851286,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "提交 root（dom 更新前）",
          "order": 11,
          "slugs": [
            {
              "depth": 1,
              "value": "提交 root（dom 更新前）",
              "heading": "提交-rootdom-更新前"
            }
          ]
        },
        "title": "提交 root（dom 更新前） - web-react"
      },
      {
        "path": "/3.source/2.react-dom/on-complete",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/onComplete.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/onComplete.md",
          "updatedTime": 1649003819276,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "渲染 root（onComplete）",
          "order": 9,
          "slugs": [
            {
              "depth": 1,
              "value": "渲染 root（onComplete）",
              "heading": "渲染-rootoncomplete"
            }
          ]
        },
        "title": "渲染 root（onComplete） - web-react"
      },
      {
        "path": "/3.source/2.react-dom/preparation",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/preparation.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/preparation.md",
          "updatedTime": 1649003584151,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "源码概览",
          "order": 1,
          "slugs": [
            {
              "depth": 1,
              "value": "源码概览",
              "heading": "源码概览"
            },
            {
              "depth": 2,
              "value": "1.创建root节点",
              "heading": "1创建root节点"
            },
            {
              "depth": 3,
              "value": "1.1 createFiberRoot",
              "heading": "11-createfiberroot"
            },
            {
              "depth": 2,
              "value": "2.更新渲染 root 节点",
              "heading": "2更新渲染-root-节点"
            },
            {
              "depth": 3,
              "value": "2.1 创建更新",
              "heading": "21-创建更新"
            },
            {
              "depth": 3,
              "value": "2.2 将生成的更新放入更新队列",
              "heading": "22-将生成的更新放入更新队列"
            },
            {
              "depth": 3,
              "value": "2.3 中断",
              "heading": "23-中断"
            },
            {
              "depth": 3,
              "value": "2.4 创建子节点和兄弟节点",
              "heading": "24-创建子节点和兄弟节点"
            },
            {
              "depth": 3,
              "value": "2.5 标识更新节点",
              "heading": "25-标识更新节点"
            },
            {
              "depth": 3,
              "value": "2.6 commitRoot",
              "heading": "26-commitroot"
            }
          ]
        },
        "title": "源码概览 - web-react"
      },
      {
        "path": "/3.source/2.react-dom/react-reconciler",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/reactReconciler.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/reactReconciler.md",
          "updatedTime": 1649003907711,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "react-reconciler",
          "order": 14,
          "slugs": [
            {
              "depth": 1,
              "value": "react-reconciler",
              "heading": "react-reconciler"
            },
            {
              "depth": 2,
              "value": "updateContainer",
              "heading": "updatecontainer"
            },
            {
              "depth": 2,
              "value": "requestCurrentTime",
              "heading": "requestcurrenttime"
            },
            {
              "depth": 2,
              "value": "computeExpirationForFiber",
              "heading": "computeexpirationforfiber"
            },
            {
              "depth": 2,
              "value": "updateContainerAtExpirationTime",
              "heading": "updatecontaineratexpirationtime"
            },
            {
              "depth": 2,
              "value": "scheduleRootUpdate",
              "heading": "schedulerootupdate"
            },
            {
              "depth": 2,
              "value": "scheduleWork",
              "heading": "schedulework"
            },
            {
              "depth": 2,
              "value": "resetStack",
              "heading": "resetstack"
            },
            {
              "depth": 3,
              "value": "unwindInterruptedWork",
              "heading": "unwindinterruptedwork"
            },
            {
              "depth": 2,
              "value": "requestWork",
              "heading": "requestwork"
            },
            {
              "depth": 3,
              "value": "addRootToSchedule",
              "heading": "addroottoschedule"
            },
            {
              "depth": 2,
              "value": "performSyncWork",
              "heading": "performsyncwork"
            },
            {
              "depth": 3,
              "value": "scheduleCallbackWithExpirationTime",
              "heading": "schedulecallbackwithexpirationtime"
            },
            {
              "depth": 2,
              "value": "performWork",
              "heading": "performwork"
            },
            {
              "depth": 2,
              "value": "performWorkOnRoot",
              "heading": "performworkonroot"
            },
            {
              "depth": 2,
              "value": "renderRoot",
              "heading": "renderroot"
            },
            {
              "depth": 2,
              "value": "workLoop",
              "heading": "workloop"
            },
            {
              "depth": 2,
              "value": "performUnitOfWork",
              "heading": "performunitofwork"
            },
            {
              "depth": 2,
              "value": "beginWork",
              "heading": "beginwork"
            },
            {
              "depth": 2,
              "value": "mountIndeterminateComponent",
              "heading": "mountindeterminatecomponent"
            }
          ]
        },
        "title": "react-reconciler - web-react"
      },
      {
        "path": "/3.source/2.react-dom/render-root",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/renderRoot.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/renderRoot.md",
          "updatedTime": 1649003774973,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "渲染 root",
          "order": 6,
          "slugs": [
            {
              "depth": 1,
              "value": "渲染 root",
              "heading": "渲染-root"
            },
            {
              "depth": 2,
              "value": "2.1 createWorkInProgress",
              "heading": "21-createworkinprogress"
            },
            {
              "depth": 2,
              "value": "2.2 workLoop",
              "heading": "22-workloop"
            },
            {
              "depth": 2,
              "value": "2.3 onComplete",
              "heading": "23-oncomplete"
            }
          ]
        },
        "title": "渲染 root - web-react"
      },
      {
        "path": "/3.source/2.react-dom/root",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/root.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/root.md",
          "updatedTime": 1649003717123,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "创建root（fiber节点）",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "创建root（fiber节点）",
              "heading": "创建rootfiber节点"
            },
            {
              "depth": 3,
              "value": "1.1 RootFiber和FiberRoot",
              "heading": "11-rootfiber和fiberroot"
            }
          ]
        },
        "title": "创建root（fiber节点） - web-react"
      },
      {
        "path": "/3.source/2.react-dom/work-loop",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/2.react-dom/workLoop.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/2.react-dom/workLoop.md",
          "updatedTime": 1649003797409,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-dom",
            "order": 2,
            "__fallback": true,
            "path": "/3.source/2.react-dom"
          },
          "title": "渲染 root（workLoop）",
          "order": 8,
          "slugs": [
            {
              "depth": 1,
              "value": "渲染 root（workLoop）",
              "heading": "渲染-rootworkloop"
            }
          ]
        },
        "title": "渲染 root（workLoop） - web-react"
      },
      {
        "path": "/3.source/3.react-router/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/3.react-router/1.index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/3.react-router/1.index.md",
          "updatedTime": 1649004039213,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "react-router",
            "order": 3,
            "__fallback": true,
            "path": "/3.source/3.react-router"
          },
          "title": "react-router",
          "order": 3,
          "slugs": [
            {
              "depth": 1,
              "value": "react-router",
              "heading": "react-router"
            }
          ]
        },
        "title": "react-router - web-react"
      },
      {
        "path": "/3.source/4.redux/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/3.source/4.redux/1.index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/3.source/4.redux/1.index.md",
          "updatedTime": 1649004053173,
          "nav": {
            "title": "源码知识",
            "order": 3,
            "path": "/3.source"
          },
          "group": {
            "title": "redux",
            "order": 4,
            "__fallback": true,
            "path": "/3.source/4.redux"
          },
          "title": "redux",
          "order": 4,
          "slugs": [
            {
              "depth": 1,
              "value": "redux",
              "heading": "redux"
            }
          ]
        },
        "title": "redux - web-react"
      },
      {
        "path": "/4.read/1/1",
        "component": require('/Users/zhoubichuan/Web-React/docs/4.read/1/1.index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/4.read/1/1.index.md",
          "updatedTime": 1649005147934,
          "nav": {
            "title": "阅读资料",
            "order": 4,
            "path": "/4.read"
          },
          "group": {
            "title": "React相关资料",
            "order": 1,
            "__fallback": true,
            "path": "/4.read/1"
          },
          "title": "React相关资料",
          "order": 1,
          "slugs": []
        },
        "title": "React相关资料 - web-react"
      },
      {
        "path": "/1.base",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/1.base/1.engine"
      },
      {
        "path": "/2.senior",
        "meta": {
          "order": 2
        },
        "exact": true,
        "redirect": "/2.senior/1.component"
      },
      {
        "path": "/2.senior/2.typescript",
        "meta": {
          "order": 2,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/2.senior/2.typescript/1"
      },
      {
        "path": "/2.senior/3.dva",
        "meta": {
          "order": 3,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/2.senior/3.dva/1"
      },
      {
        "path": "/2.senior/4.umi",
        "meta": {
          "order": 4,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/2.senior/4.umi/1"
      },
      {
        "path": "/2.senior/5.use",
        "meta": {
          "order": 5,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/2.senior/5.use/1"
      },
      {
        "path": "/3.source/1.react",
        "meta": {
          "order": 1,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/3.source/1.react/preparation"
      },
      {
        "path": "/3.source",
        "meta": {
          "order": 3
        },
        "exact": true,
        "redirect": "/3.source/1.react"
      },
      {
        "path": "/3.source/2.react-dom",
        "meta": {
          "order": 2,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/3.source/2.react-dom/preparation"
      },
      {
        "path": "/3.source/3.react-router",
        "meta": {
          "order": 3,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/3.source/3.react-router/1"
      },
      {
        "path": "/3.source/4.redux",
        "meta": {
          "order": 4,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/3.source/4.redux/1"
      },
      {
        "path": "/4.read/1",
        "meta": {
          "order": 1,
          "__fallback": true
        },
        "exact": true,
        "redirect": "/4.read/1/1"
      },
      {
        "path": "/4.read",
        "meta": {
          "order": 4
        },
        "exact": true,
        "redirect": "/4.read/1"
      }
    ],
    "title": "web-react",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
