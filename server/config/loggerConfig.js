import {format,transports} from 'winston'
import  expressWinston from 'express-winston'
import {dateFormat} from "../utils.js";

const loggerConfig = expressWinston.logger({
    level: 'info',
    meta: false,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; },
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.json()
    ),
    defaultMeta: { service: 'one-page-app' },
    transports: [
        new transports.File({ filename: `./logs/${dateFormat('Y-m-d',new Date())}-info.log` }),
    ]
});

export default loggerConfig