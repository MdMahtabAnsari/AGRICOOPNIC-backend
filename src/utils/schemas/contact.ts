import {z} from 'zod/v4';
import { email,name } from './common.schema';


export const contactSchema = z.object({
    name: name,
    email: email,
    message: z.string().min(10, "Message must be at least 10 characters long").max(3000, "Message must not exceed 3000 characters")
});

export type ContactSchema = z.infer<typeof contactSchema>;