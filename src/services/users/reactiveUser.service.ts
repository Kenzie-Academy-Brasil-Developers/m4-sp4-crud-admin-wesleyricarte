import { iUserWithoutPassword } from '../../interfaces/users.interfaces';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';

const reactiveUserService = async (
	id: number
): Promise<iUserWithoutPassword> => {
	const queryConfig: QueryConfig = {
		text: `UPDATE users SET active = true WHERE "id" = $1 RETURNING id, name, email, admin, active;`,
		values: [id],
	};

	const queryResult: QueryResult = await client.query(queryConfig);

	return queryResult.rows[0];
};

export default reactiveUserService;
