import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import passwordRouter from './router/password.js'
import appRouter from './router/app.js'

const app = express()
const port = 8000
app.use(helmet());
app.use(bodyParser.json())
app.use('/password', passwordRouter);

app.use('/', appRouter);

app.listen(port, () => {
    console.log(`OnePage app listening on port ${port}`)
})