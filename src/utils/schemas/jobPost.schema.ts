import {z} from 'zod/v4';



export const jobPostSchema = z.object({
    name: z.enum(['ASSISTANT_BRANCH_MANAGER', 'RELATIONSHIP_MANAGER', 'MULTITASKING_STAFF', 'BLOCK_SUPERVISOR'], {
        message: 'Invalid job post name'
    }),

});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
