import Bootcamp from '../models/Bootcamp.model.js';
import User from '../models/User.model.js';

//////////////////LISTAR TODOS LOS BOOTCAMP///////////////////////
export const findAll = async (req, res) => {
	try {
		let bootcamps = await Bootcamp.findAll({
			include: [
				{
					model: User,
					as: 'user',
					attributes: { exclude: ['cue'] },
					through: {
						attributes: [],
					},
				},
			],
		});
		if (bootcamps.length == 0) {
			return res.status(400).send({
				code: 400,
				message: `No hay bootcamps en la base de datos`,
			});
		}
		res.send({
			code: 200,
			data: bootcamps,
		});
		console.log(bootcamps.dataVal);

		// res.render('bootcamps', {
		// 	bootcamps,
		// });
	} catch (error) {
		console.log(error);
		res.status(500).send({
			code: 500,
			message: 'Error al consultar el curso de bootcamp',
		});
	}
};

//////////////////// CREAR BOOTCAMP/////////////////
export const createBootcamp = async (req, res) => {
	try {
		let { title, cue, description } = req.body;
		const nuevoBootcamp = await Bootcamp.create({
			title,
			cue,
			description,
		});

		res.status(201).send({
			code: 201,
			message: 'Bootcamp se ha creado con el ID: ' + nuevoBootcamp.id,
		});
	} catch (error) {
		res.status(500).send({
			code: 500,
			messege: error.message,
		});
	}
};

///////////////////FIND POR ID//////////////////////////

export const findById = async (req, res) => {
	try {
		let { id } = req.params;
		// let { nombre, email, password } = req.body;
		let bootcampConsultado = await Bootcamp.findByPk(id, {
			include: [
				{
					model: User,
					as: 'user',
					through: {
						attributes: [],
					},
				},
			],
		});
		if (!bootcampConsultado) {
			return res.status(400).send({
				code: 400,
				message: `Bootcamp con ID:${id} no existe en la base de datos`,
			});
		}
		res.status(200).send({
			code: 200,
			data: bootcampConsultado,
			message: `Bootcamp ID: ${id} se muestra con éxito`,
		});
		// console.log(bootcampConsultado.dataValues.user);

		// res.render('bootcamp', {
		// 	bootcamp: bootcampConsultado,
		// });
	} catch (error) {
		res.status(500).send({
			code: 500,
			messege: 'No se pudo mostrar al bootcamp',
		});
	}
};

export const addUser = async (req, res) => {
	try {
		let { bootcampId, userId } = req.body;
		console.log(userId);
		let foundBootcamp = await Bootcamp.findByPk(bootcampId);
		let foundUser = await User.findByPk(userId);
		if (!foundBootcamp) {
			return res.status(400).send({
				code: 400,
				message: `Bootcamp con ID:${bootcampId} no existe en la base de datos`,
			});
		}
		if (!foundUser) {
			return res.status(400).send({
				code: 400,
				message: `Usuario con ID:${userId} no existe en la base de datos`,
			});
		}

		let addedUser = await foundBootcamp.addUser(foundUser);
		res.status(200).send({
			code: 200,
			data: addedUser,
			message: `Usuario ${foundUser.id} agregado a Bootcamp ${foundBootcamp.id}`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			code: 500,
			messege: 'No se pudo añadir el usuario al bootcamp',
		});
	}
};
