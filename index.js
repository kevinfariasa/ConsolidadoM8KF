import sequelize from './app/config/database.config.js';
import app from './app/app.js';
import chalk from 'chalk';

//importar asociaciones
import './app/models/asociaciones.js';

const main = async () => {
	try {
		await sequelize.authenticate();
		console.log(chalk.blue('Conectado con éxito a la BD'));
		await sequelize.sync({ force: false, alter: true }); //force: false cuando está en producción.
		let PORT = 3001;
		app.listen(PORT, () =>
			console.log(
				chalk.green('Servidor escuchando en http://localhost:' + PORT)
			)
		);
	} catch (error) {
		console.log('Ha ocurrido un error: ', error);
	}
};
main();
