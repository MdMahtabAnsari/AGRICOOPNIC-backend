import {z} from 'zod/v4';
import {id,email} from './common.schema';
import { userIdSchema } from './auth.schema';

export const jwtPayloadSchema = z.object({
    id: id,
    userId: userIdSchema
});

export const jwtResetPayloadSchema = z.object({
    email: email
});

export type JwtResetPayloadSchema = z.infer<typeof jwtResetPayloadSchema>;

export type JwtPayloadSchema = z.infer<typeof jwtPayloadSchema>;