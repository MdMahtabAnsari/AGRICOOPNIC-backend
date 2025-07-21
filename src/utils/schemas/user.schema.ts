import {z} from 'zod/v4';
import { name,email,phone,aadhaar } from './common.schema';

export const userSchema = z.object({
    name: name,
    email,
    phone,
    aadhaar
});

export type UserSchema = z.infer<typeof userSchema>;