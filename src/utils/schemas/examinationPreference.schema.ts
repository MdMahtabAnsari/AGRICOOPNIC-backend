import {z} from 'zod/v4';



export const examinationPreferenceSchema = z.object({
    preferenceType: z.enum(['PREFERENCE_1','PREFERENCE_2'], {
        message: 'Invalid preference location'
    }),
    examCenterName: z.enum(['DELHI_NCR', 'BHUBANESWAR', 'AHMEDABAD', 'KOLKATA', 'HARYANA'], {
        message: 'Invalid exam center name'
    })
});

export type ExaminationPreferenceSchema = z.infer<typeof examinationPreferenceSchema>;
