---
nav:
  title: 基础知识
  order: 1
group:
  title: React 功能模块
  order: 3
title: 消息通知
order: 7
---

# 六.消息通知

## 1.全局通知栏与应用初始化

与前端主导的通知系统不同，系统消息更依赖后端的实现。这里我们假设后端提供了获取当前用户未读消息的接口 `/notices`，创建相应的 redux action 为：

```js
const getNotices = () => createAsyncAction("APP_GET_NOTICES", () => api.get("/notices"))
```

### 1.1 应用数据初始化

在实现系统消息之前，我们首先要解决应用数据初始化的问题。以系统消息为例，用户在登录系统后点击应用页眉中的通知栏就应当立刻可以看到当前的未读消息。但获取用户未读消息是一个异步的过程，这里的异步请求应该在什么时候发出呢？

最简单的解决方案当然是在用户点击通知栏时发出，但这样做的弊端是用户在阅读消息前需要等待时间，没有充分利用到用户登录系统后但未点击通知栏这段空闲时间，而且如果用户频繁点击通知栏的话还会导致大量的冗余异步请求被发送至后端。

另一个解决方案就是在用户成功登录后发送请求去取得最新的未读消息：

```js
const login = (username, password) =>
  createAsyncAction("APP_LOGIN", () =>
    api.post("/login", {
      username,
      password,
    })
  )

const loginUser = (username, password) => {
  const action = login(username, password)

  return (dispatch) =>
    action(dispatch).then((callbackAction) => {
      if (callbackAction.type === "APP_LOGIN_SUCCESS") {
        return getNotices()(dispatch)
      }
      return null
    })
}
```

但这样做会有一个例外就是因为系统会记录用户的登录状态，在鉴权过期前用户刷新页面是不需要重新登录的。这时我们就需要在系统初始化时，判断如果用户已经登录就发送获取系统消息的请求。

```js
const initClient = (dispatch) => {
  const commonActions = [dispatch(appAction.getLocale())]

  const isLogin = !isNil(Cookie.get("user"))

  if (isLogin) {
    commonActions.push(dispatch(appAction.getNotices()))
  }

  return commonActions
}
```

并在应用的入口文件中将 redux 的 `dispatch` 方法传入 `initClient`：

```js
const { store, history } = createStore(createBrowserHistory(), {})
const application = createApp(store, history)

initClient(store.dispatch)
ReactDOM.render(application, window.document.getElementById("app"))
```

按照同样的逻辑，我们可以将这一解决方案拓展到更多的需求，如在应用初始化时获取用户信息、国家时区信息等。

### 1.2 更新消息列表

在解决了数据获取的问题后，我们的布局组件就可以直接访问 redux store 中 app reducer 下的 `notices` 数据了。这里关于把 `notices` 存在哪个 reducer 中可能会有争议，比如它可以属于 `app` 的 reducer，即存放全局数据的地方，也可以单独创建一个 `basicLayout` 的 reducer 来存放布局组件所需要的数据，两种方案都是可行的。

接下来我们要实现的需求是在用户点击某一条消息后将其从消息列表中删除，因为系统消息列表是由后端控制的，所以这时我们需要向后端发送一个 `DELETE` 的请求以删除当前用户点击的某条消息。这时又会出现一个分歧是，后端在接收到 `DELETE` 请求后会不会将最新的消息列表再返回给前端。如果后端能够返回的话，我们只需要在 reducer 中替换掉原先的消息列表即可，但如果后端只返回操作成功或失败的话，我们还需要再发送一遍 `getNotices` 请求去拉取最新的消息列表。

最后，我们还需要处理无未读消息时的情况。

## 2.全局通知

回到一开始提到的操作反馈部分。

如果系统中的每个页面都需要独立去处理操作反馈的话，可以预见的是 `<Notification />` 组件几乎会出现在所有的页面。这样的解决方案不仅非常烦琐而且不利于统一处理通用的逻辑。

既然通知组件可以使用绝对定位的方式出现在不同页面的同一位置，那么我们能不能将它的显示和隐藏逻辑也放在全局的层面上进行处理呢？

在回答这个问题前，我们先来写一个简单的基于绝对定位、支持自动隐藏的 UI 通知组件。

```js
class Notification extends Component {
  componentDidMount() {
    this.timeout = setTimeout(this.props.onDismiss, this.props.timeout)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { prefixCls, title, content, onDismiss } = this.props

    return (
      <div className={prefixCls}>
        <Icon
          className={`${prefixCls}-close`}
          type="close"
          onClick={onDismiss}
        />
        <div className={`${prefixCls}-title`}>{title}</div>
        <div>{content}</div>
      </div>
    )
  }
}
```

从上述代码中可以看出，`onDismiss` 回调就是为使用者隐藏全局通知时准备的。为了在全局的层面上解决通知的问题，让我们在 app reducer 中为通知提供一个存放数据的位置，暂且称为 `notification`，其中包含 `title` 及 `content` 两个字段。

```js
// app reducer
const defaultState = () => ({
  isLogin: false,
  user: {},
  notification: {
    title: "",
    content: "",
  },
})

// app action
const updateNotification = (notification) => ({
  type: "APP_UPDATE_NOTIFICATION",
  payload: notification,
})

const resetNotification = () => ({
  type: "APP_RESET_NOTIFICATION",
})

// app reducer
const updateNotification = (state, action) => ({
  ...state,
  notification: action.payload,
})

const resetNotification = (state) => ({
  ...state,
  notification: {
    title: "",
    content: "",
  },
})
```

再将通知的渲染逻辑添加到 `BasicLayout` 布局组件中：

```js
renderNotification = () => {
  const {
    notification: { title, content },
    resetNotification,
  } = this.props
  if (isEmpty(title) && isEmpty(content)) {
    return null
  }
  return (
    <Notification
      title={title}
      content={content}
      onDismiss={resetNotification}
    />
  )
}
```

即如果 `notification` 的 `title` 和 `content` 字段都不为空的话，就显示全局通知。同时我们也将重置通知的 action 配置给了 `Notification` 组件的 `onDismiss` 回调，即关闭通知相当于重置 `notification` 字段为空对象。

等这些准备工作都做好后，在具体的页面中显示通知就变得非常容易了：

```js
const mapDispatchToProps = {
  updateNotification: appAction.updateNotification,
}

;<Button
  type="primary"
  onClick={() =>
    this.props.updateNotification({
      title: "Notification Title",
      content: "Notification will dismiss after 4.5s.",
    })
  }
>
  >
</Button>
```

将 app action 中的 `updateNotification` 函数 connect 至相应的页面组件即可。然后在这个页面中，使用者就可以直接调用 `this.props.updateNotification` 来显示相应的通知了。又因为通知组件本身就支持自动隐藏的功能，使用者也不再需要去处理隐藏的逻辑。

## 知识点：数据驱动视图

全局通知这个例子很好地为我们诠释了「数据驱动视图」的含义，即根据数据中心是否存在 `notification` 对象来决定是否渲染通知组件。这打破了原先显示或隐藏通知这样命令式的代码逻辑，让每一次的用户操作从执行命令变为了修改数据，然后再由更新后的新数据去驱动视图进行相应的更新。

熟悉 React 的朋友一定看过下面这个公式：

```js
view = f(state)
```

即视图是由当前应用状态推导而来。我们再尝试将 redux 也包含进来，在这个公式的基础上进行一下拓展。

根据

```js
view = f1(state) && nextState = f2(currentState, action)
```

可以推导出

```js
view = f1(f2(currentState, action))
```

对应到全局通知的例子，f2 就是 app reducer 中处理数据的逻辑，而 f1 就是 `BasicLayout` 中的渲染逻辑。有了这两个函数，currentState 是确定的一份数据，在具体 action 的驱动下视图就可以自动地进行更新。

因为视图的不可枚举性（无限种可能），命令式的编码方式一直以来都非常不适合前端应用的开发，因为它会导致非常多的边界情况且不可测试。在传统的前端开发中我们很难说出「在什么情况下视图一定是什么样」这样的话，但根据上面的公式推导，如果我们善加利用 React + Redux 的特性的话前端开发也是可以有底气做到「视图结果可预测」的。

