import express from 'express'
import helmet from 'helmet'
import passwordRouter from './router/password.js'
import appRouter from './router/page.js'
import loggerConfig from "./config/loggerConfig.js";
import pageShareRouter from "./router/page-share.js";
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
// 用于提高应用的安全性
app.use(helmet());
// 添加静态资源目录
app.use(express.static('public'));
// 日志打印中间件
app.use(loggerConfig)
// json解析
app.use(express.json())



// 纸张页面路由
app.use('/api', appRouter);
// 纸张密码路由
app.use('/api', passwordRouter);
app.use('/api', pageShareRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app