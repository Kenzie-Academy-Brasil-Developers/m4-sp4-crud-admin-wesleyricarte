import { Request, Response } from 'express';
import createUsersService from '../services/users/createUsers.service';
import listAllUsersService from '../services/users/listAllUsers.service';
import listLoggedInUserService from './../services/users/listLoggedInUser.service';
import deleteUserService from './../services/users/deleteUser.service';
import reactiveUserService from './../services/users/reactiveUser.service';
import { AppError } from './../errors';
import {
	iAllUser,
	iUpdateUserRequest,
	iUserRequest,
	iUserWithoutPassword,
} from '../interfaces/users.interfaces';
import updateUserService from './../services/users/updateUser.service';

// CREATE USER
export const createUsersController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userData: iUserRequest = req.body;

	const newUser: iUserWithoutPassword = await createUsersService(userData);

	return res.status(201).json(newUser);
};

// LIST ALL USERS
export const listAllUsersController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const allUsers: iAllUser = await listAllUsersService();

	return res.status(200).json(allUsers);
};

// LIST LOGGED IN USER
export const listLoggedInUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.user;

	const user: iUserWithoutPassword = await listLoggedInUserService(id);

	return res.status(200).json(user);
};

// UPDATE USER
export const updateUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	if (!req.body.name && !req.body.email && !req.body.password) {
		throw new AppError(
			'At least one of the following fields is required: "name", "email", or "password"!',
			400
		);
	}

	const userId: number = parseInt(req.params.id);
	const { name, email, password } = req.body;

	const updateUserData: iUpdateUserRequest = {
		...(name && { name }),
		...(email && { email }),
		...(password && { password }),
	};

	const updatedUser: iUserWithoutPassword = await updateUserService(
		userId,
		updateUserData
	);

	return res.status(200).json(updatedUser);
};

//DELETE USER
export const deleteUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId: number = parseInt(req.params.id);

	const { id: myId, admin } = req.user;

	if (!admin && userId !== myId) {
		throw new AppError('Insufficient Permission', 403);
	}

	await deleteUserService(userId);

	return res.status(204).send();
};

// REACTIVE USER
export const reactiveUserController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId: number = parseInt(req.params.id);

	const user: iUserWithoutPassword = await reactiveUserService(userId);

	return res.status(200).json(user);
};
