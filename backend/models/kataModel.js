import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Kata = db.define(
    "kata",
    {
        kata: DataTypes.STRING
    },
    {
        freezeTableName: true,
    }
);

export default Kata;

(async () => {
    await db.sync();
})();
