# ticketing-web

移动Web端电影购票系统

## 安装

```
$ npm install
```

## 使用

项目运行需求 `node` 版本不低于 `v7.6.0`。

```
$ npm run test
```

## 实现相关

### 目录结构

```
ticketing-web
  |__dist             (生成的资源目录)
  |__node_modules     (依赖包安装)
  |__src
      |__actions      (redux中的actions)
      |__components   (公用组件库)
      |__containers   (容器)
      |__reducers     (redux中的reducers)
      |__sagas        (用于处理redux异步处理的sagas)
      |__services     (关于服务端的配置)
      |__utils        (通用组件)
      |__typings      
```
