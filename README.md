# One Page App

## 在线演示
[演示地址](https://onpa.herokuapp.com)

## 运行环境
**Node.js v16.16.0 lts**

## 数据库准备
编辑 `server/config/datasource.js`，可选sqlite/MySQL

## 启动
- 启动服务端
1. `cd server`
2. `npm i && npm run dev`

- 启动web端
1. `cd web`
2. `npm i && npm run dev`

## 部署

- 单服务部署
1. `cd web && npm run build`
2. `cd server && node ./bin/www`
