import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Image = db.define(
    "image",
    {
        alt: DataTypes.STRING,
        url: DataTypes.STRING
    },
    {
        freezeTableName: true,
    }
);

export default Image;

(async () => {
    await db.sync();
})();
