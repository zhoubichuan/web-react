---
nav:
  title: 基本语法
  order: 1
group:
  title: React 功能模块
  order: 3
title: 权限管理
order: 5
---

# 四.权限管理

::: tip 前言
这里我们先来介绍两种常见的权限管理设计模式，即基于角色的访问控制以及访问控制列表。
:::

## 1.设计策略

### 1.1 基于角色的访问控制

基于角色的访问控制不直接将系统操作的各种权限赋予具体用户，而是在用户与权限之间建立起角色集合，将权限赋予角色再将角色赋予用户。这样就实现了对于权限和角色的集中管理，避免用户与权限之间直接产生复杂的多对多关系。

### 1.2 访问控制列表

具体到角色与权限之间，访问控制列表指代的是某个角色所拥有的系统权限列表。在传统计算机科学中，权限一般指的是对于文件系统进行增删改查的权力。而在 Web 应用中，大部分系统只需要做到页面级别的权限控制即可，简单来说就是根据当前用户的角色来决定其是否拥有查看当前页面的权利。

## 2.实战代码

### 2.1 路由容器

在编写权限管理相关的代码前，我们需要先为所有的页面路由找到一个合适的容器，即 `react-router` 中的 `Switch` 组件。与多个独立路由不同的是，包裹在 `Switch` 中的路由每次只会渲染路径匹配成功的第一个，而不是所有符合路径匹配条件的路由。

```js
<Router>
  <Route path="/about" component={About} />
  <Route path="/:user" component={User} />
  <Route component={NoMatch} />
</Router>
```

```js
<Router>
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/:user" component={User} />
    <Route component={NoMatch} />
  </Switch>
</Router>
```

以上面两段代码为例，如果当前页面路径是 `/about` 的话，因为 `<About />`、`<User />` 及 `<NoMatch />` 这三个路由的路径都符合 `/about`，所以它们会同时被渲染在当前页面。而将它们包裹在 `Switch` 中后，`react-router` 在找到第一个符合条件的 `<About />` 路由后就会停止查找直接渲染 `<About />` 组件。

在企业管理系统中因为页面与页面之间一般都是平行且排他的关系，所以利用好 `Switch` 这个特性对于我们简化页面渲染逻辑有着极大的帮助。

另外值得一提的是，在 `react-router` 作者 [Ryan Florence](https://github.com/ryanflorence) 的新作 [@reach/router](https://reach.tech/router) 中，`Switch` 的这一特性被默认包含了进去，而且 `@reach/router` 会自动匹配最符合当前路径的路由。这就使得使用者不必再去担心路由的书写顺序，感兴趣的朋友可以关注一下。

### 2.2 权限管理

现在我们的路由已经有了一个大体的框架，下面就让我们为其添加具体的权限判断逻辑。

对于一个应用来说，除去需要鉴权的页面外，一定还存在着不需要鉴权的页面，让我们先将这些页面添加到我们的路由中，如登录页。

```js
<Router>
  <Switch>
    <Route path="/login" component={Login} />
  </Switch>
</Router>
```

对于需要鉴权的路由，我们需要先抽象出一个判断当前用户是否有权限的函数来作为判断依据，而根据具体的需求，用户可以拥有单个角色或多个角色，抑或更复杂的一个鉴权函数。这里笔者提供一个最基础的版本，即我们将用户的角色以字符串的形式存储在后台，如一个用户的角色是 admin，另一个用户的角色是 user。

```js
import isEmpty from "lodash/isEmpty"
import isArray from "lodash/isArray"
import isString from "lodash/isString"
import isFunction from "lodash/isFunction"
import indexOf from "lodash/indexOf"

const checkPermissions = (authorities, permissions) => {
  if (isEmpty(permissions)) {
    return true
  }

  if (isArray(authorities)) {
    for (let i = 0; i < authorities.length; i += 1) {
      if (indexOf(permissions, authorities[i]) !== -1) {
        return true
      }
    }
    return false
  }

  if (isString(authorities)) {
    return indexOf(permissions, authorities) !== -1
  }

  if (isFunction(authorities)) {
    return authorities(permissions)
  }

  throw new Error("[react-acl-router]: Unsupport type of authorities.")
}

export default checkPermissions
```

在上一节中我们提到了路由的配置文件，这里我们为每一个需要鉴权的路由再添加一个属性 `permissions`，即哪些角色可以访问该页面。

```js
const routes = [
  {
    path: "/outlets",
    exact: true,
    permissions: ["admin", "user"],
    component: Outlets,
    unauthorized: Unauthorized,
    pageTitle: "Outlet Management",
    breadcrumb: ["/outlets"],
  },
  {
    path: "/outlets/:id",
    exact: true,
    permissions: ["admin"],
    component: OutletDetail,
    redirect: "/",
    pageTitle: "Outlet Detail",
    breadcrumb: ["/outlets", "/outlets/:id"],
  },
]
```

在上面的配置中，admin 和 user 都可以访问门店列表页面，但只有 admin 才可以访问门店详情页面。

对于没有权限查看当前页面的情况，一般来讲有两种处理方式，一是直接重定向到另一个页面（如首页），二是渲染一个无权限页面，提示用户因为没有当前页面的权限所以无法查看。二者是排他的，即每个页面只需要使用其中一种即可，于是我们在路由配置中可以根据需要去配置 `redirect` 或 `unauthorized` 属性，分别对应**无权限重定向**及**无权限显示无权限页面**两种处理方式。具体代码大家可以参考示例项目 [react-acl-router](https://github.com/AlanWei/react-acl-router/blob/master/src/AclRouter.jsx) 中的实现，这里摘录一小段核心部分。

```js
renderRedirectRoute = (route) => (
  <Route
    key={route.path}
    {...omitRouteRenderProperties(route)}
    render={() => <Redirect to={route.redirect} />}
  />
)

renderAuthorizedRoute = (route) => {
  const { authorizedLayout: AuthorizedLayout } = this.props
  const { authorities } = this.state
  const {
    permissions,
    path,
    component: RouteComponent,
    unauthorized: Unauthorized,
  } = route
  const hasPermission = checkPermissions(authorities, permissions)

  if (!hasPermission && route.unauthorized) {
    return (
      <Route
        key={path}
        {...omitRouteRenderProperties(route)}
        render={(props) => (
          <AuthorizedLayout {...props}>
            <Unauthorized {...props} />
          </AuthorizedLayout>
        )}
      />
    )
  }

  if (!hasPermission && route.redirect) {
    return this.renderRedirectRoute(route)
  }

  return (
    <Route
      key={path}
      {...omitRouteRenderProperties(route)}
      render={(props) => (
        <AuthorizedLayout {...props}>
          <RouteComponent {...props} />
        </AuthorizedLayout>
      )}
    />
  )
}
```

于是，在最终的路由中，我们会优先匹配无需鉴权的页面路径，保证所有用户在访问无需鉴权的页面时，第一时间就可以看到页面。然后再去匹配需要鉴权的页面路径，最终如果所有的路径都匹配不到的话，再渲染 404 页面告知用户当前页面路径不存在。

```js
<Switch>
  {map(normalRoutes, (route) => this.renderNormalRoute(route))}
  {map(authorizedRoutes, (route) => this.renderAuthorizedRoute(route))}
  {this.renderNotFoundRoute()}
</Switch>
```

需要鉴权的路由和不需要鉴权的路由作为两种不同的页面，一般而言它们的页面布局也是不同的。如登录页面使用的就是普通页面布局：

在这里我们可以将不同的页面布局与鉴权逻辑相结合以达到只需要在路由配置中配置相应的属性，新增加的页面就可以同时获得鉴权逻辑和基础布局的效果。这将极大地提升开发者们的工作效率，尤其是对于项目组的新成员来说纯配置的上手方式是最友好的。

## 3.应用集成

至此一个包含基础权限管理的应用路由就大功告成了，我们可以将它抽象为一个独立的路由组件，使用时只需要配置需要鉴权的路由和不需要鉴权的路由两部分即可。

```js
const authorizedRoutes = [
  {
    path: "/outlets",
    exact: true,
    permissions: ["admin", "user"],
    component: Outlets,
    unauthorized: Unauthorized,
    pageTitle: "pageTitle_outlets",
    breadcrumb: ["/outlets"],
  },
  {
    path: "/outlets/:id",
    exact: true,
    permissions: ["admin", "user"],
    component: OutletDetail,
    unauthorized: Unauthorized,
    pageTitle: "pageTitle_outletDetail",
    breadcrumb: ["/outlets", "/outlets/:id"],
  },
  {
    path: "/exception/403",
    exact: true,
    permissions: ["god"],
    component: WorkInProgress,
    unauthorized: Unauthorized,
  },
]

const normalRoutes = [
  {
    path: "/",
    exact: true,
    redirect: "/outlets",
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
]

const Router = (props) => (
  <ConnectedRouter history={props.history}>
    <MultiIntlProvider defaultLocale={locale} messageMap={messages}>
      // the router component
      <AclRouter
        authorities={props.user.authorities}
        authorizedRoutes={authorizedRoutes}
        authorizedLayout={BasicLayout}
        normalRoutes={normalRoutes}
        normalLayout={NormalLayout}
        notFound={NotFound}
      />
    </MultiIntlProvider>
  </ConnectedRouter>
)

const mapStateToProps = (state) => ({
  user: state.app.user,
})

Router.propTypes = propTypes
export default connect(mapStateToProps)(Router)
```

在实际项目中，我们可以使用 `react-redux` 提供的 `connect` 组件将应用路由 connect 至 redux store，以方便我们直接读取当前用户的角色信息。一旦登录用户的角色发生变化，客户端路由就可以进行相应的判断与响应。

## 4.权限管理

对于页面级别的权限管理来说，权限管理部分的逻辑是独立于页面的，是与页面中的具体内容无关的。也就是说，权限管理部分的代码并不应该成为页面中的一部分，而是应该在拿到用户权限后创建应用路由时就将没有权限的页面替换为重定向或无权限页面。

这样一来，页面部分的代码就可以实现与权限管理逻辑的彻底解耦，以至于如果抽掉权限管理这一层后，页面就变成了一个无需权限判断的页面依然可以独立运行。而通用部分的权限管理代码也可以在根据业务需求微调后服务于更多的项目。
