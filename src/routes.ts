import { Router } from 'express';
import { UserControlller } from './controllers/UserController';
import { User } from './entities/User';

const routes = Router();

routes.post('/user', new UserControlller().create)
routes.post('/login', new UserControlller().login)

routes.get('/profile', new UserControlller().getProfile)

export default routes;