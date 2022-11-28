import {Sequelize} from 'sequelize';

const db = new Sequelize('search_engine', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db