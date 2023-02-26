import { QueryConfig } from 'pg';
import { client } from '../../database';

const deleteUserService = async (id: number): Promise<void> => {
	const queryConfig: QueryConfig = {
		text: `UPDATE users SET active = false WHERE "id" = $1;`,
		values: [id],
	};

	await client.query(queryConfig);

	return;
};

export default deleteUserService;
