import {z} from 'zod/v4';
import {id} from './common.schema';
import { userIdSchema } from './auth.schema';

export const jwtPayloadSchema = z.object({
    id: id,
    userId: userIdSchema
});

export type JwtPayloadSchema = z.infer<typeof jwtPayloadSchema>;