import sequelize from './app/config/database.config.js';
import app from './app/app.js';
import chalk from 'chalk';
import User from './app/models/User.model.js';
import Bootcamp from './app/models/Bootcamp.model.js';
import bcrypt from 'bcrypt';
// import "./app/models/Usuario.models.js"

//importar asociaciones
import './app/models/asociaciones.js';

const main = async () => {
	try {
		await sequelize.authenticate();
		console.log(chalk.blue('Conectado con éxito a la BD'));
		await sequelize.sync({ force: false, alter: true });

		const salt = bcrypt.genSaltSync(10);
		const passwordHashed = (pass) => {
			return bcrypt.hashSync(pass, salt);
		};
		// Bulk creating Users
		const users = await User.bulkCreate([
			{
				firstName: 'Mateo',
				lastName: 'Díaz',
				email: 'mateo.diaz@correo.com',
				password: passwordHashed('mateo123456'),
			},
			{
				firstName: 'Santiago',
				lastName: 'Mejías',
				email: 'santiago.mejias@correo.com',
				password: passwordHashed('santiago123456'),
			},
			{
				firstName: 'Lucas',
				lastName: 'Rojas',
				email: 'lucas.rojas@correo.com',
				password: passwordHashed('lucas123456'),
			},
			{
				firstName: 'Facundo',
				lastName: 'Fernández',
				email: 'facundo.fernandez@correo.com',
				password: passwordHashed('facundo123456'),
			},
		]);

		// Bulk creating Bootcamps
		const bootcamps = await Bootcamp.bulkCreate([
			{
				title: 'Introduciendo El Bootcamp de React',
				cue: 5,
				description:
					'React es la librería más usada en JavaScript para el desarrollo de interfaces',
			},
			{
				title: 'Bootcamp Desarrollo Web Full Stack',
				cue: 6,
				description:
					'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS',
			},
			{
				title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
				cue: 9,
				description:
					'Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e integrarlos con modelos avanzados de Artificial Intelligence y Machine Learning',
			},
		]);
		await sequelize.close();
	} catch (error) {
		console.log('Ha ocurrido un error: ', error);
	}
};
main();
