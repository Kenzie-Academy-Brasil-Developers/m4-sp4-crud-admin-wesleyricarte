import { QueryResult } from 'pg';
import {
	UserRequestSchema,
	UserSchema,
	UserSchemaWithoutPassword,
	allUsersSchema,
	updateUserSchema,
} from '../schemas/users.schemas';
import { z } from 'zod';

// CREATE USER REQUEST
export type iUserRequest = z.infer<typeof UserRequestSchema>;

// USER SCHEMA
export type iUser = z.infer<typeof UserSchema>;

// USER /WITHOUT PASSWORD
export type iUserWithoutPassword = z.infer<typeof UserSchemaWithoutPassword>;

// USER /WITHOUT PASSWORD QUERY RESULT
export type iUserResult = QueryResult<iUserWithoutPassword>;

// USER /WITH PASSWORD QUERY RESULT
export type iUserResultWithPassword = QueryResult<iUser>;

// LIST ALL USERS SCHEMA
export type iAllUser = z.infer<typeof allUsersSchema>;

// UPDATE USER SCHEMA
export type iUpdateUserRequest = z.infer<typeof updateUserSchema>;
