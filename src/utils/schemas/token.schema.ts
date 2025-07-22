import {z} from 'zod/v4';
import { userIdSchema } from './auth.schema';
export const tokenSchema = z.object({
    userId: userIdSchema,
    token: z.jwt({error: "Invalid token format"}),
    expiredAt: z.date({error: "Invalid expiration date"})
});

export type TokenSchema = z.infer<typeof tokenSchema>;
