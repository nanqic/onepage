import { Model, DataTypes } from "sequelize"
import { sequelize } from "../db.js";

class TempPage extends Model { }

TempPage.init(
    {
        seourl: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'compositeIndex'
        },
        sharedUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: 'compositeIndex'
        },
        content: DataTypes.TEXT,
        password: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'TempPage'
    }
);
await sequelize.sync({ force: false });

export default TempPage

