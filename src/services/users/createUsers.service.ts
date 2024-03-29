import {
	iUserRequest,
	iUserResult,
	iUserWithoutPassword,
} from '../../interfaces/users.interfaces';
import { client } from '../../database';
import format from 'pg-format';
import { QueryConfig, QueryResult } from 'pg';
import { AppError } from '../../errors';

const createUsersService = async (
	userData: iUserRequest
): Promise<iUserWithoutPassword> => {
	const queryConfigUserExists: QueryConfig = {
		text: `SELECT * FROM users WHERE email = $1;`,
		values: [userData.email],
	};

	const queryResultUserExists: QueryResult = await client.query(
		queryConfigUserExists
	);

	if (queryResultUserExists.rowCount !== 0) {
		throw new AppError('Email already exists!', 409);
	}

	const queryString: string = format(
		`INSERT INTO users(%I)
        VALUES (%L)
        RETURNING id, name, email, admin, active;`,
		Object.keys(userData),
		Object.values(userData)
	);

	const queryResult: iUserResult = await client.query(queryString);

	return queryResult.rows[0];
};

export default createUsersService;
