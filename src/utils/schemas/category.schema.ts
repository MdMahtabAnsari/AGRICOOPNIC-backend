import {z} from 'zod/v4';

export const categoryTypeEnum = z.enum(['EWS_OR_OBC', 'SC_OR_ST', 'PWBD', 'GENERAL'], {
    message: 'Invalid category type'
});

export type CategoryType = z.infer<typeof categoryTypeEnum>;
export const categorySchema = z.object({
    categoryType: categoryTypeEnum,
});

export type CategorySchema = z.infer<typeof categorySchema>;