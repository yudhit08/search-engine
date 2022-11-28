import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Kalimat = db.define(
    "kalimat",
    {
        kalimat: DataTypes.TEXT,
    },
    {
        freezeTableName: true,
    }
);

export default Kalimat;

(async () => {
    await db.sync();
})();
