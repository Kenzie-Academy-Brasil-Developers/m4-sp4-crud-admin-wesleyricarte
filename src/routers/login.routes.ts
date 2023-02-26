import { Router } from 'express';
import { loginController } from '../controllers/locin.controllers';
import validateDataMiddleware from '../middlewares/validateData.middleware';
import { loginRequestSchema } from '../schemas/login.schemas';

const loginRoutes: Router = Router();

loginRoutes.post('', validateDataMiddleware(loginRequestSchema), loginController);

export default loginRoutes;
