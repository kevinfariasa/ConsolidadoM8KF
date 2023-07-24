import express from 'express';
import Bootcamp from '../models/Bootcamp.model.js';
import User from '../models/User.model.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', (req, res) => {
	res.render('home');
});
router.get('/bootcamp', async (req, res) => {
	let bootcamps = await Bootcamp.findAll();
	res.render('bootcamps', {
		bootcamps,
	});
});

router.get('/signup', (req, res) => {
	res.render('subscriptionForm');
});
router.get('/signin', (req, res) => {
	res.render('login');
});
router.get('/user', verifyToken, async (req, res) => {
	let users = await User.findAll({
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
	res.render('users', {
		users,
	});
});
router.get('/perfil', verifyToken, (req, res) => {
	let user = req.usuario;
	res.render('perfil', {
		user,
	});
});
router.get('/administrar', verifyToken, async (req, res) => {
	let bootcamps = await Bootcamp.findAll();
	let users = await User.findAll();
	res.render('administrar', {
		bootcamps,
		users,
	});
});
router.get('/bootcamp/id/:id', verifyToken, async(req,res)=>{
	let {id} = req.params;
	let foundBootcamp = await Bootcamp.findByPk(id, {
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
	console.log(foundBootcamp)
	res.render('bootcamp',{
		bootcamp: foundBootcamp
	})
})
router.get('/user/id/:id', verifyToken, async(req,res)=>{
	let {id} = req.params;
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
	res.render('user',{
		user
	})
})
export default router;
