import { Sequelize, Model, DataTypes } from "sequelize"
import { sequelize } from "../db.js";

class TempPage extends Model { }

TempPage.init(
    {
        seourl: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: 'compositeIndex'
        },
        content: DataTypes.TEXT,
        password: DataTypes.TEXT,
    },
    {
        sequelize,
        modelName: 'TempPage'
    }
);
await sequelize.sync({ force: false });

export default TempPage

export const respOk = {
    code: 0,
    msg: 'ok'
}

export const respErr = {
    code: -1,
    msg: 'err'
}

