import {z} from 'zod/v4';

export const userIdSchema = z.string().min(3, "User ID must be at least 3 characters long").max(50, "User ID must not exceed 50 characters").regex(/^[a-zA-Z0-9_]+$/, "User ID can only contain alphanumeric characters and underscores");

export const authSchema = z.object({
    userId: userIdSchema,
    password: z.string().min(8, "Password must be at least 8 characters long").max(100, "Password must not exceed 100 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
});

export type AuthSchema = z.infer<typeof authSchema>;

export const userIdObj=z.object({
    userId: userIdSchema
});
export type UserIdSchema = z.infer<typeof userIdSchema>;

export type UserIdObj = z.infer<typeof userIdObj>;
