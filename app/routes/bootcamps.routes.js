import express from 'express';
import {
	findAll,
	createBootcamp,
	findById,
	addUser,
} from '../controllers/bootcamp.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.get('/', findAll);
router.post('/', verifyToken,createBootcamp);
router.get('/id/:id', verifyToken, findById);
router.post('/adduser', verifyToken, addUser);


export default router;
