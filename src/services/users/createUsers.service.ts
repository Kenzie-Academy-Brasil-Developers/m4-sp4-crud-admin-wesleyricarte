import {
	iUserRequest,
	iUserResult,
	iUserWithoutPassword,
} from '../../interfaces/users.interfaces';
import { client } from '../../database';
import format from 'pg-format';
import { QueryConfig, QueryResult } from 'pg';
import { UserSchemaWithoutPassword } from '../../schemas/users.schemas';
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
		throw new AppError('User already exists!', 409);
	}

	const queryString: string = format(
		`INSERT INTO users(%I)
        VALUES (%L)
        RETURNING *;`,
		Object.keys(userData),
		Object.values(userData)
	);

	const queryResult: iUserResult = await client.query(queryString);

	const newUser: iUserWithoutPassword = UserSchemaWithoutPassword.parse(
		queryResult.rows[0]
	);

	return newUser;
};

export default createUsersService;
