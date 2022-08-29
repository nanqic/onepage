import { Sequelize } from "sequelize"
import logger from "./config/logger.js";
import {dbConfig} from "./config/datasource.js";

export const sequelize = new Sequelize(dbConfig);

try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
} catch (error) {
    logger.error('Unable to connect to the database:', error);
}

