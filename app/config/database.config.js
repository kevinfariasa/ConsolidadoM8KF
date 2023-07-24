import Sequelize from 'sequelize';
import 'dotenv/config';

const db = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(db, user, password, {
	host: host,
	dialect: 'postgres',
});

export default sequelize;
