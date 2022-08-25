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
        shared_url: {
            type: DataTypes.TEXT,
            allowNull: true,
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

