import {z} from 'zod/v4';

export const JobPostEnum = z.enum([
    'MTS',
    'SUPERVISOR',
    'CLERK',
    'ASSISTANT_AGRICULTURE_OFFICER',
    'AGRICULTURE_OFFICER',
    'FIELD_OFFICER'
],"Invalid job post name");

export type JobPostEnum = z.infer<typeof JobPostEnum>;

export const jobPostSchema = z.object({
    name: JobPostEnum
});


export type JobPostSchema = z.infer<typeof jobPostSchema>;
