import { z } from 'zod';

export const loginRequestSchema = z.object({
	email: z.string().email().min(5).max(100),
	password: z.string().min(8),
});
