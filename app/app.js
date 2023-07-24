import express from 'express';
import usersRoutes from './routes/users.routes.js';
import bootcampsRoutes from './routes/bootcamps.routes.js';
import viewsRoutes from './routes/views.routes.js';
import { create } from 'express-handlebars';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const hbs = create({
	partialsDir: [path.join(__dirname, 'views/partials/')],
});
const publicFolder = path.join(__dirname, '../public');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// RUTAS ENDPOINTS
app.use('/api/v1/user', usersRoutes);
app.use('/api/v1/bootcamp', bootcampsRoutes);

// RUTAS VISTAS
app.use('/', viewsRoutes);
export default app;
