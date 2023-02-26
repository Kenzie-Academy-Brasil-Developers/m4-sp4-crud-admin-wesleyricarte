import { QueryResult } from 'pg';
import { client } from '../../database';
import { iAllUser } from '../../interfaces/users.interfaces';

const listAllUsersService = async (): Promise<iAllUser> => {
	const queryString: string = `SELECT id, name, email, admin, active FROM users;`;

	const queryResult: QueryResult = await client.query(queryString);

	const allUsers: iAllUser = queryResult.rows;

	return allUsers;
};

export default listAllUsersService;
