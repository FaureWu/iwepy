# iwepy

结合小程序框架[wepy](https://tencent.github.io/wepy/)，状态管理库[zoro](https://github.com/FaureWu/zoro)，ui组件库[iview](https://weapp.iviewui.com/?from=iview)，小程序开发解决方案

## 启动开发环境

### 安装依赖
```bash
yarn
```

### 启动dev环境
```bash
yarn dev
```

> 你可以通过APP_ENV来配置开发环境链接不同的server服务器

### 启动mock环境
```bash
yarn mock
```

> mock环境下server会链接本地启动的mock服务器，也就是APP_ENV将会无效

环境启动后，只需在微信开发者工具中，打开dist目录即可进行实时开发

## 打包生产环境代码

```bash
yarn build
```

dist目录为最终发布目录

## 如何配置不同环境下的server地址

根目录下wepy.config.js文件中
```js
const SERVER = {
  dev: '',
  prod: '',
}
```

## 如何编写mock

该项目引入[faker](https://github.com/Marak/faker.js)做为模拟数据生成器，具体写法参考[faker文档](https://github.com/Marak/faker.js)，及项目根目录下mock/demo.js

## 如何编写model

请查看src/models/下的使用演示，更多信息查看[zoro文档](https://github.com/FaureWu/zoro/blob/master/doc/API.md)

## 如何发起请求

iwepy因为对wepy框架的request进行了一次封装，放于src/utils/request.js中，需要请求时请引入此工具代替

提供了的api有:
* request() 参数同wepy.request
* get(url, params, options)
* post(url, params, options)
* delete(url, params, options)

以上接口均支持冒号参数

使用方法
```js
import request from '@/utils/request'

request.get('/api/product/:id', { id: 1 }).then(...)
```

model中使用请参考src/models/的文件

## 如何使用iview库

```js
export default class Index extends wepy.page {
  config = {
    navigationBarTitleText: 'wepy小程序演示',
    usingComponents: {
      // 这里需要填写相对路径，不可以使用别名
      'i-panel': '../iview/panel/index',
      'i-button': '../iview/button/index',
      'i-spin': '../iview/spin/index',
      'i-alert': '../iview/alert/index',
    },
  }
```

```html
<template>
<i-panel i-class="index-panel" title="演示全局HTTP错误捕获">
  <i-button @click="handleQueryHttpError" type="primary">点击演示http错误</i-button>
  <i-spin fix wx:if="{{ loading.queryHttpError }}" />
</i-panel>
</template>
```
相关组件参考iview文档，需要注意的是，替换iview中的事件为wepy的对应事件即可
