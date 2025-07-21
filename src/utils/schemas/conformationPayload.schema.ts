import { addressSchema } from "./address.schema";
import { userSchema } from "./user.schema";
import { categorySchema } from "./category.schema";
import { examinationPreferenceSchema } from "./examinationPreference.schema";
import { documentSchema } from "./document.schema";
import { educationSchema } from "./education.schema";
import { familySchema } from "./family.schema";
import { jobPostSchema } from "./jobPost.schema";
import { personalDetailSchema } from "./personalDetail.schema";
import { z } from "zod/v4";

export const conformationPayloadSchema = z.object({
    user: userSchema,
    address: z.array(addressSchema),
    category: categorySchema,
    examinationPreferences: z.array(examinationPreferenceSchema),
    documents: z.array(documentSchema),
    education: z.array(educationSchema),
    family: familySchema,
    jobPost: jobPostSchema.extend({
        applicationNo: z.string(),
    }),
    personalDetail: personalDetailSchema
});

export type ConformationPayload = z.infer<typeof conformationPayloadSchema>;