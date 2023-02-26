import { loginRequestSchema } from '../schemas/login.schemas';
import { z } from 'zod';

export type iLoginRequest = z.infer<typeof loginRequestSchema>;
