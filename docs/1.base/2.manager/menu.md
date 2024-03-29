---
nav:
  title: 基础知识
  order: 1
group:
  title: React 功能模块
  order: 3
title: 菜单匹配
order: 6
---

# 五.菜单匹配

<Alert type="info"> 前言
在成熟的组件库支持下，UI 层面想要做出一个漂亮的侧边栏菜单并不困难，但因为在企业管理系统中菜单还承担着页面导航的功能，于是就导致了两大难题，一是多级菜单如何处理，二是菜单项的子页面（如点击门店管理中的某一个门店进入的门店详情页在菜单中并没有对应的菜单项）如何高亮其隶属于的父级菜单。
</Alert>

## 1.多级菜单

为了增强系统的可扩展性，企业管理系统中的菜单一般都需要提供多级支持，对应的数据结构就是在每一个菜单项中都要有 children 属性来配置下一级菜单项。

```js
const menuData = [
  {
    name: "仪表盘",
    icon: "dashboard",
    path: "dashboard",
    children: [
      {
        name: "分析页",
        path: "analysis",
        children: [
          {
            name: "实时数据",
            path: "realtime",
          },
          {
            name: "离线数据",
            path: "offline",
          },
        ],
      },
    ],
  },
]
```

### 1.1 递归渲染父菜单及子菜单

想要支持多级菜单，首先要解决的问题就是如何统一不同级别菜单项的交互。

在大多数的情况下，每一个菜单项都代表着一个不同的页面路径，点击后会触发 url 的变化并跳转至相应页面，也就是上面配置中的 path 字段。

但对于一个父菜单来说，点击还意味着打开或关闭相应的子菜单，这就与点击跳转页面发生了冲突。为了简化这个问题，我们先统一菜单的交互为点击父菜单（包含 children 属性的菜单项）为打开或关闭子菜单，点击子菜单（不包含 children 属性的菜单项）为跳转至相应页面。

首先，为了成功地渲染多级菜单，菜单的渲染函数是需要支持递归的，即如果当前菜单项含有 children 属性就将其渲染为父菜单并优先渲染其 children 字段下的子菜单，这在算法上被叫做[深度优先遍历](https://baike.baidu.com/item/%E6%B7%B1%E5%BA%A6%E4%BC%98%E5%85%88%E9%81%8D%E5%8E%86)。

```js
renderMenu = (data) =>
  map(data, (item) => {
    if (item.children) {
      return (
        <SubMenu
          key={item.path}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </span>
          }
        >
          {this.renderMenu(item.children)}
        </SubMenu>
      )
    }

    return (
      <Menu.Item key={item.path}>
        <Link to={item.path} href={item.path}>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    )
  })
```

这样我们就拥有了一个支持多级展开、子菜单分别对应页面路由的侧边栏菜单。细心的朋友可能还发现了，虽然父菜单并不对应一个具体的路由但在配置项中依然还有 path 这个属性，这是为什么呢？

## 2.处理菜单高亮

在传统的企业管理系统中，为不同的页面配置页面路径是一件非常痛苦的事情，对于页面路径，许多开发者唯一的要求就是不重复即可，如上面的例子中，我们把菜单数据配置成这样也是可以的。

```js
const menuData = [{
  name: '仪表盘',
  icon: 'dashboard',
  children: [{
    name: '分析页',
    children: [{
      name: '实时数据',
      path: '/realtime',
    }, {
      name: '离线数据',
      path: '/offline',
    }],
  }],
}];

<Router>
  <Route path="/realtime" render={() => <div />}
  <Route path="/offline" render={() => <div />}
</Router>
```

用户在点击菜单项时一样可以正确地跳转到相应页面。但这样做的一个致命缺陷就是，对于 `/realtime` 这样一个路由，如果只根据当前的 `pathname` 去匹配菜单项中 `path` 属性的话，要怎样才能同时也匹配到「分析页」与「仪表盘」呢？因为如果匹配不到的话，「分析页」和「仪表盘」就不会被高亮了。我们能不能在页面的路径中直接体现出菜单项之间的继承关系呢？来看下面这个工具函数。

```js
import map from "lodash/map"

const formatMenuPath = (data, parentPath = "/") =>
  map(data, (item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
    }
    if (item.children) {
      result.children = formatMenuPath(
        item.children,
        `${parentPath}${item.path}/`
      )
    }
    return result
  })
```

这个工具函数把菜单项中可能有的 `children` 字段考虑了进去，将一开始的菜单数据传入就可以得到如下完整的菜单数据。

```json
[{
  name: '仪表盘',
  icon: 'dashboard',
  path: '/dashboard',  // before is 'dashboard'
  children: [{
    name: '分析页',
    path: '/dashboard/analysis', // before is 'analysis'
    children: [{
      name: '实时数据',
      path: '/dashboard/analysis/realtime', // before is 'realtime'
    }, {
      name: '离线数据',
      path: '/dashboard/analysis/offline', // before is 'offline'
    }],
  }],
}];
```

然后让我们再对当前页面的路由做一下逆向推导，即假设当前页面的路由为 `/dashboard/analysis/realtime`，我们希望可以同时匹配到 `['/dashboard', '/dashboard/analysis', '/dashboard/analysis/realtime']`，方法如下：

```js
import map from "lodash/map"

const urlToList = (url) => {
  if (url) {
    const urlList = url.split("/").filter((i) => i)
    return map(
      urlList,
      (urlItem, index) => `/${urlList.slice(0, index + 1).join("/")}`
    )
  }
  return []
}
```

上面的这个数组代表着不同级别的菜单项，将这三个值分别与菜单数据中的 `path` 属性进行匹配就可以一次性地匹配到所有当前页面应当被高亮的菜单项了。

这里需要注意的是，虽然菜单项中的 `path` 一般都是普通字符串，但有些特殊的路由也可能是正则的形式，如 `/outlets/:id`。所以我们在对二者进行匹配时，还需要引入 `path-to-regexp` 这个库来处理类似 `/outlets/1` 和 `/outlets/:id` 这样的路径。又因为初始时菜单数据是树形结构的，不利于进行 `path` 属性的匹配，所以我们还需要先将树形结构的菜单数据扁平化，然后再传入 `getMeunMatchKeys` 中。

```js
import pathToRegexp from "path-to-regexp"
import reduce from "lodash/reduce"
import filter from "lodash/filter"

const getFlatMenuKeys = (menuData) =>
  reduce(
    menuData,
    (keys, item) => {
      keys.push(item.path)
      if (item.children) {
        return keys.concat(getFlatMenuKeys(item.children))
      }
      return keys
    },
    []
  )

const getMeunMatchKeys = (flatMenuKeys, paths) =>
  reduce(
    paths,
    (matchKeys, path) =>
      matchKeys.concat(
        filter(flatMenuKeys, (item) => pathToRegexp(item).test(path))
      ),
    []
  )
```

在这些工具函数的帮助下，多级菜单的高亮也不再是问题了。

## 2.1 记忆化（Memoization）

在侧边栏菜单中，有两个重要的状态：一个是 `selectedKeys`，即当前选定的菜单项；另一个是 `openKeys`，即多个多级菜单的打开状态。这二者的含义是不同的，因为在 `selectedKeys` 不变的情况下，用户在打开或关闭其他多级菜单后，`openKeys` 是会发生变化的，如下面二图所示，`selectedKeys` 相同但 `openKeys` 不同。

对于 `selectedKeys` 来说，由于它是由页面路径（`pathname`）决定的，所以每一次 `pathname` 发生变化都需要重新计算 `selectedKeys` 的值。又因为通过 `pathname` 以及最基础的菜单数据 `menuData` 去计算 `selectedKeys` 是一件非常昂贵的事情（要做许多数据格式处理和计算），有没有什么办法可以优化一下这个过程呢？

[Memoization](https://en.wikipedia.org/wiki/Memoization) 可以赋予普通函数记忆输出结果的功能，它会在每次调用函数之前检查传入的参数是否与之前执行过的参数完全相同，如果完全相同则直接返回上次计算过的结果，就像常用的缓存一样。

```js
import memoize from 'memoize-one';

constructor(props) {
  super(props);

  this.fullPathMenuData = memoize(menuData => formatMenuPath(menuData));
  this.selectedKeys = memoize((pathname, fullPathMenu) => (
    getMeunMatchKeys(getFlatMenuKeys(fullPathMenu), urlToList(pathname))
  ));

  const { pathname, menuData } = props;

  this.state = {
    openKeys: this.selectedKeys(pathname, this.fullPathMenuData(menuData)),
  };
}
```

在组件的构造器中我们可以根据当前 props 传来的 `pathname` 及 `menuData` 计算出当前的 `selectedKeys` 并将其当做 `openKeys` 的初始值初始化组件内部 state。因为 `openKeys` 是由用户所控制的，所以对于后续 `openKeys` 值的更新我们只需要配置相应的回调将其交给 `Menu` 组件控制即可。

```js
import Menu from "antd/lib/menu"

handleOpenChange = (openKeys) => {
  this.setState({
    openKeys,
  })
}
;<Menu
  style={{ padding: "16px 0", width: "100%" }}
  mode="inline"
  theme="dark"
  openKeys={openKeys}
  selectedKeys={this.selectedKeys(pathname, this.fullPathMenuData(menuData))}
  onOpenChange={this.handleOpenChange}
>
  {this.renderMenu(this.fullPathMenuData(menuData))}
</Menu>
```

这样我们就实现了对于 `selectedKeys` 及 `openKeys` 的分别管理，开发者在使用侧边栏组件时只需要将应用当前的页面路径同步到侧边栏组件中的 `pathname` 属性即可，侧边栏组件会自动处理相应的菜单高亮（`selectedKeys`）和多级菜单的打开与关闭（`openKeys`）。

## 2.2 正确区分 prop 与 state

上述这个场景也是一个非常经典的关于如何正确区分 prop 与 state 的例子。

`selectedKeys` 由传入的 `pathname` 决定，于是我们就可以将 `selectedKeys` 与 `pathname` 之间的转换关系封装在组件中，使用者只需要传入正确的 `pathname` 就可以获得相应的 `selectedKeys` 而不需要关心它们之间的转换是如何完成的。而 `pathname` 作为组件渲染所需的基础数据，组件无法从自身内部获得，所以就需要使用者通过 props 将其传入进来。

另一方面， `openKeys` 作为组件内部的 state，初始值可以由 `pathname` 计算而来，后续的更新则与组件外部的数据无关而是会根据用户的操作在组件内部完成，那么它就是一个 state，与其相关的所有逻辑都可以彻底地被封装在组件内部而不需要暴露给使用者。

简而言之，一个数据如果想成为 prop 就必须是组件内部无法获得的，而且在它成为了 prop 之后，所有可以根据它的值推导出来的数据都不再需要成为另外的 props，否则将违背 React 单一数据源的原则。对于 state 来说也是同样，如果一个数据想成为 state，那么它就不应该再能够被组件外部的值所改变，否则也会违背单一数据源的原则而导致组件的表现不可预测，产生难解的 bug。
