import { hashSync } from 'bcryptjs';
import { z } from 'zod';

// CREATE USER
export const UserRequestSchema = z.object({
	name: z.string().min(3).max(20),
	email: z.string().email().min(5).max(100),
	password: z
		.string()
		.min(8)
		.transform((pass) => hashSync(pass, 10)),
});

// USER SCHEMA
export const UserSchema = UserRequestSchema.extend({
	id: z.number(),
	admin: z.boolean(),
	active: z.boolean(),
});

// USER WITHOUT PASSWORD
export const UserSchemaWithoutPassword = UserSchema.omit({ password: true });

// ALL USERS
export const allUsersSchema = z.array(UserSchemaWithoutPassword);

// UPDATE USER
export const updateUserSchema = z.object({
	name: z.string().min(3).max(20).optional(),
	email: z.string().email().min(5).max(100).optional(),
	password: z
		.string()
		.min(8)
		.transform((pass) => hashSync(pass, 10))
		.optional(),
});
