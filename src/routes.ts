import { Router } from 'express';
import { UserControlller } from './controllers/UserController';
import { User } from './entities/User';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();

routes.post('/user', new UserControlller().create)
routes.post('/login', new UserControlller().login)

// routes.get('/profile', authMiddleware, new UserControlller().getProfile)

routes.use(authMiddleware)

routes.get('/profile', new UserControlller().getProfile)

export default routes;