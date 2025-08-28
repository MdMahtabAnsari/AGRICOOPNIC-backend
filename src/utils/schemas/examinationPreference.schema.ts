import {z} from 'zod/v4';

export const examinationPreferenceSchema = z.object({
    preferenceType: z.enum(['PREFERENCE_1','PREFERENCE_2','PREFERENCE_3'], {
        message: 'Invalid preference location'
    }),
    examCenterName: z.enum([
        'DELHI_NCR',
        'LUCKNOW',
        'AHMEDABAD',
        'BHOPAL',
        'MUMBAI',
        'KOLKATA',
        'BHUBANESWAR',
        'RANCHI',
        'PATNA',
        'BANGLORE'
    ], {
        message: 'Invalid exam center name'
    })
});

export type ExaminationPreferenceSchema = z.infer<typeof examinationPreferenceSchema>;