import {z} from 'zod/v4';
import {name} from './common.schema';

export const familySchema = z.object({
    fatherName: name,
    motherName: name,
});

export type FamilySchema = z.infer<typeof familySchema>;