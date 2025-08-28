import {z} from 'zod/v4';

export const jobPostSchema = z.object({
    name: z.enum([
        'MTS',
        'SUPERVISOR',
        'CLERK',
        'ASSISTANT_AGRICULTURE_OFFICER',
        'AGRICULTURE_OFFICER',
        'FIELD_OFFICER'
    ], {
        message: 'Invalid job post name'
    }),
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
