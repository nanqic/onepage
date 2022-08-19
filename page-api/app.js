import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import passwordRouter from './router/password.js'
import appRouter from './router/page.js'

const app = express()
app.use(helmet());
app.use(bodyParser.json())

// 纸张页面路由
app.use('/', appRouter);
// 纸张密码路由
app.use('/password', passwordRouter);

export default app