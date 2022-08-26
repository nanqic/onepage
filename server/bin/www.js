import app from '../app.js'
import logger from "../config/logger.js";
import 'dotenv/config'

const port = process.env.PORT || 8000;

// 配置跨域 Access-Control-Allow-Origin为允许跨域的地址
app.all('/api/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,x-password,Authorization");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.listen(port, () =>
    logger.info(`OnePage is running on port ${port}, http://localhost:${port}`)
);
