import { createLogger, format, transports } from 'winston'
import {dateFormat} from "../utils.js";

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'ONE_PAGE_APP' },
    transports: [
        new transports.File({ filename: `./logs/${dateFormat('Y-m-d',new Date())}-error.log`, level: 'info' }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

export default logger