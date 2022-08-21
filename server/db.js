import { Sequelize, Op, Model, DataTypes } from "sequelize"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './onepage.db'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

