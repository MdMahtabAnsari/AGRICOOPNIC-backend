import {z} from 'zod/v4';


export const addressSchema = z.object({
    addressType: z.enum(['PERMANENT', 'CORRESPONDENCE'], {
        message: 'Invalid address type'
    }),
    addressLine: z.string().min(5, 'Address line is required').max(200, 'Address line must be less than 200 characters'),
    city: z.string().min(2, 'City is required').max(100, 'City must be less than 100 characters'),
    state: z.string().min(2, 'State is required').max(100, 'State must be less than 100 characters'),
    pinCode: z.string().min(4, 'Pin code is required').max(10, 'Pin code must be less than 10 characters')
});

export type AddressSchema = z.infer<typeof addressSchema>;