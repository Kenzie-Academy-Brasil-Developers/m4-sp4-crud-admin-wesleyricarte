import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { AppError } from '../errors';
import { client } from '../database';

const ensureUserExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { id: userId } = req.params;

	const queryConfig: QueryConfig = {
		text: `SELECT * FROM users WHERE id = $1;`,
		values: [userId],
	};

	const queryResult: QueryResult = await client.query(queryConfig);

	if (!queryResult.rowCount) {
		throw new AppError('User not found', 404);
	}

	return next();
};

export default ensureUserExistsMiddleware;
