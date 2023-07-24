import User from '../models/User.model.js';
import Bootcamp from '../models/Bootcamp.model.js';
import bcrypt from 'bcrypt';

export const findAll = async (req, res) => {
	try {
		const users = await User.findAll({
			include: [
				{
					model: Bootcamp,
					as: 'bootcamp',
					attributes: { exclude: ['createdAt', 'updatedAt'] },
					through: {
						attributes: [],
					},
				},
			],
		});
		if (users.length == 0) {
			return res.status(400).json({
				code: 400,
				message: `No hay usuarios en la base de datos`,
			});
		}
		res.status(200).json({ code: 200, data: users });
		// res.render('users', {
		// 	users,
		// });
	} catch (error) {
		res.status(500).json({ code: 500, message: 'No se pudo consultar Users', error });
	}
};

export const findUserById = async (req, res) => {
	try {
		let { id } = req.params;
		// ¡¡¡INCLUIR BOOTCAMPS DEL USUARIO!!!
		let user = await User.findByPk(id, {
			include: [
				{
					model: Bootcamp,
					as: 'bootcamp',
					attributes: { exclude: ['createdAt', 'updatedAt'] },
					through: {
						attributes: [],
					},
				},
			],
		});
		if (!user) {
			res.status(400).json({
				code: 400,
				message: `Usuario con ID:${id} no existe en la base de datos`,
			});
		}
		res
			.status(200)
			.json({ code: 200, data: user, message: 'Usuario encontrado' });
		// console.log(user.dataValues);
		// res.render('user', {
		// 	user: user.dataValues,
		// });
	} catch (error) {
		res.status(500).json({ code: 500, message: 'No se pudo buscar usuario' });
	}
};

export const createUser = async (req, res) => {
	try {
		let { firstName, lastName, email, password } = req.body;

		const salt = bcrypt.genSaltSync(10);
		const passwordHashed = bcrypt.hashSync(password, salt);

		const newUser = await User.create({
			firstName,
			lastName,
			email,
			passwordHashed,
		});
		res
			.status(201)
			.json({ code: 201, data: newUser, message: 'Usuario creado con éxito' });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ code: 500, message: 'No se pudo crear nuevo usuario' });
	}
};

export const updateUserById = async (req, res) => {
	try {
		let { id } = req.params;
		let user = await User.findByPk(id);
		if (!user) {
			res.status(400).json({
				code: 400,
				message: `Usuario con ID:${id} no existe en la base de datos`,
			});
		}
		let { firstName, lastName } = req.body;
		let updatedUser = await User.update(
			{ firstName, lastName },
			{
				where: {
					id,
				},
			}
		);
		res.status(200).json({
			code: 200,
			data: updatedUser,
			message: `Usuario con ID:${id} actualizado con éxito`,
		});
	} catch (error) {
		res
			.status(500)
			.json({ code: 500, message: 'No se pudo actualizar el usuario' });
	}
};

export const deleteUserById = async (req, res) => {
	try {
		let { id } = req.params;
		let user = await User.findByPk(id);
		if (!user) {
			res.status(400).json({
				code: 400,
				message: `Usuario con ID:${id} no existe en la base de datos`,
			});
		}
		await User.destroy({
			where: {
				id,
			},
		});
		res.status(200).json({
			code: 200,
			message: `Usuario con ID:${id} eliminado con éxito`,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ code: 500, message: 'No se pudo eliminar el usuario' });
	}
};

export const login = async (req, res) => {
	try {
		res.json({ code: 200, message: 'Login correcto', token: req.token });
		
	} catch (error) {
		res.json({code:200, message: 'Login incorrecto'})
	}
};
