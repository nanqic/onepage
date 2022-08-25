import express from 'express'
import helmet from 'helmet'
import passwordRouter from './router/password.js'
import appRouter from './router/page.js'
import loggerConfig from "./config/loggerConfig.js";
import pageShareRouter from "./router/page-share.js";

const app = express()
// 用于提高应用的安全性
app.use(helmet());
// 日志打印中间件
app.use(loggerConfig)
// json解析
app.use(express.json())

// 纸张页面路由
app.use('/', appRouter);
// 纸张密码路由
app.use('/page/password', passwordRouter);
app.use('/share', pageShareRouter);

export default app