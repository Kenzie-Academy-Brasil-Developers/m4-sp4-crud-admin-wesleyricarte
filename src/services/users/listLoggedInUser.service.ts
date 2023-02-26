import { QueryConfig } from 'pg';
import { client } from '../../database';
import {
	iUserResult,
	iUserWithoutPassword,
} from '../../interfaces/users.interfaces';

const listLoggedInUserService = async (
	id: number
): Promise<iUserWithoutPassword> => {
	const queryConfig: QueryConfig = {
		text: `SELECT id, name, email, admin, active FROM users WHERE "id" = $1;`,
		values: [id],
	};

	const queryResult: iUserResult = await client.query(queryConfig);

	return queryResult.rows[0];
};

export default listLoggedInUserService;
