import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Video = db.define(
    "video",
    {
        alt: DataTypes.STRING,
        url: DataTypes.STRING
    },
    {
        freezeTableName: true,
    }
);

export default Video;

(async () => {
    await db.sync();
})();
