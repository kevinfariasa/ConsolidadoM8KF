import User from './User.model.js';
import Bootcamp from './Bootcamp.model.js';

// Asociación muchos a muchos - N:M
User.belongsToMany(Bootcamp, {
	through: 'user_bootcamp',
	as: 'bootcamp',
	foreignKey: 'user_id',
});
Bootcamp.belongsToMany(User, {
	through: 'user_bootcamp',
	as: 'user',
	foreignKey: 'bootcamp_id',
});
