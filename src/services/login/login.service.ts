import { QueryConfig } from 'pg';
import { iLoginRequest } from '../../interfaces/login.interfaces';
import { iUserResultWithPassword } from '../../interfaces/users.interfaces';
import { client } from '../../database';
import { AppError } from '../../errors';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginService = async (loginData: iLoginRequest): Promise<string> => {
	const { email, password } = loginData;

	const queryString: string = `SELECT * FROM users WHERE email = $1;`;

	const queryConfig: QueryConfig = {
		text: queryString,
		values: [email],
	};

	const queryResult: iUserResultWithPassword = await client.query(
		queryConfig
	);

	if (!queryResult.rowCount) {
		throw new AppError('Invalid email or password', 401);
	}

	const matchPassword: boolean = await compare(
		password,
		queryResult.rows[0].password
	);

	if (!matchPassword) {
		throw new AppError('Invalid email or password', 401);
	}

	const token: string = jwt.sign(
		{
			admin: queryResult.rows[0].admin,
			active: queryResult.rows[0].active,
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: '24h',
			subject: queryResult.rows[0].id.toString(),
		}
	);

	return token;
};

export default loginService;
