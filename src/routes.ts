import { Router } from 'express';
import { ApiError, BadRequestError, NotFoundError, UnauthorizedError} from './helpers/api-erros'
import { UserControlller } from './controllers/UserController';

const routes = Router();

routes.post('/user', new UserControlller().create)
routes.post('/login', new UserControlller().login)

export default routes;