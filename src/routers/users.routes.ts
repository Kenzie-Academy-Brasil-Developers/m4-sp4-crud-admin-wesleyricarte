import { Router } from 'express';
import validateDataMiddleware from '../middlewares/validateData.middleware';
import tokenMiddleware from '../middlewares/token.middleware';
import adminMiddleware from '../middlewares/admin.middleware';
import ensureUserExistsMiddleware from '../middlewares/ensureUserExists.middleware'
import {
	createUsersController,
	deleteUserController,
	listAllUsersController,
	listLoggedInUserController,
	reactiveUserController,
	updateUserController,
} from '../controllers/users.controllers';
import { UserRequestSchema } from '../schemas/users.schemas';
import { updateUserSchema } from './../schemas/users.schemas';

const userRoutes: Router = Router();

userRoutes.post('',	validateDataMiddleware(UserRequestSchema), createUsersController);

userRoutes.get('', adminMiddleware, listAllUsersController);

userRoutes.get('/profile', tokenMiddleware, listLoggedInUserController);

userRoutes.patch('/:id', tokenMiddleware, validateDataMiddleware(updateUserSchema), updateUserController);

userRoutes.delete('/:id', tokenMiddleware, deleteUserController);

userRoutes.put('/:id/recover', adminMiddleware, ensureUserExistsMiddleware, reactiveUserController);

export default userRoutes;
