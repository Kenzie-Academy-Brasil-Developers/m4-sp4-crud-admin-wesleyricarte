import { Request, Response } from 'express';

import loginService from '../services/login/login.service';

export const loginController = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const token = await loginService(req.body);

	return res.json({
		token: token,
	});
};
