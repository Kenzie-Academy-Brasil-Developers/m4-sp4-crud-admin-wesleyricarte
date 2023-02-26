import { QueryConfig, QueryResult } from 'pg';
import format from 'pg-format';
import { client } from '../../database';
import { AppError } from '../../errors';
import {
	iUpdateUserRequest,
	iUserResult,
	iUserWithoutPassword,
} from '../../interfaces/users.interfaces';

const updateUserService = async (
	userId: number,
	updateUserData: iUpdateUserRequest
): Promise<iUserWithoutPassword | any> => {
	if (updateUserData.email) {
		const queryConfigUserExists: QueryConfig = {
			text: `SELECT * FROM users WHERE email = $1;`,
			values: [updateUserData.email],
		};

		const queryResultUserExists: QueryResult = await client.query(
			queryConfigUserExists
		);

		if (queryResultUserExists.rowCount !== 0) {
			throw new AppError('User already exists!', 409);
		}
	}

	const queryConfigOldUser: QueryConfig = {
		text: `SELECT name FROM users WHERE id = $1;`,
		values: [userId],
	};

	const { rows } = await client.query(queryConfigOldUser);

	if (rows[0].name === updateUserData.name) {
		throw new AppError(
			'The "name" value inserted is the same! Try again with a new value.'
		);
	}

	const queryString: string = format(
		`
        UPDATE users
        SET (%I) = (%L)
        WHERE id = %s
        RETURNING id, name, email, admin, active;`,
		Object.keys(updateUserData),
		Object.values(updateUserData),
		userId
	);

	const queryResult: iUserResult = await client.query(queryString);

	return queryResult.rows[0];
};

export default updateUserService;
