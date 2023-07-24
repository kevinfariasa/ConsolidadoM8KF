import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const Bootcamp = sequelize.define('bootcamps', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cue: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 5,
			max: 10,
			isInt: true,
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Bootcamp;
