import { z } from 'zod/v4';
import { email } from './common.schema';

const password = z.string().min(8, "Password must be at least 8 characters long").max(100, "Password must not exceed 100 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")

export const userIdSchema = z.string().min(3, "User ID must be at least 3 characters long").max(50, "User ID must not exceed 50 characters").regex(/^[a-zA-Z0-9_]+$/, "User ID can only contain alphanumeric characters and underscores");

export const signUpSchema = z.object({
    userId: userIdSchema,
    email: email,
    password: password
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    identifier:z.union([userIdSchema, email]),
    password: password
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const userIdObj = z.object({
    userId: userIdSchema
});

export const userIdEmailObjectWithOptional = z.object({
    userId: userIdSchema.optional(),
    email: email.optional()
}).refine((data) => data.userId || data.email, {
    message: "Either userId or email must be provided"
});

export const passwordSchema = z.object({
    password: password
});

export type PasswordSchema = z.infer<typeof passwordSchema>;

export type UserIdEmailObjectWithOptional = z.infer<typeof userIdEmailObjectWithOptional>;

export type UserIdSchema = z.infer<typeof userIdSchema>;

export type UserIdObj = z.infer<typeof userIdObj>;

