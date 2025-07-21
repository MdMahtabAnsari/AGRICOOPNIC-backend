import {z} from 'zod/v4';



export const documentSchema = z.object({
    documentType: z.enum(['PHOTO', 'SIGNATURE', 'AADHAAR_FRONT', 'AADHAAR_BACK'], {
        message: 'Invalid document type'
    }),
    url: z.url({ message: 'Invalid URL format' }),
});

export type DocumentSchema = z.infer<typeof documentSchema>;