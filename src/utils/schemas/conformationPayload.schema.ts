import { addressSchema } from "./address.schema";
import { userSchema } from "./user.schema";
import { categorySchema, categoryTypeEnum } from "./category.schema";
import { examinationPreferenceSchema } from "./examinationPreference.schema";
import { documentSchema } from "./document.schema";
import { educationSchema } from "./education.schema";
import { familySchema } from "./family.schema";
import { jobPostSchema } from "./jobPost.schema";
import { personalDetailSchema } from "./personalDetail.schema";
import { z } from "zod/v4";
import { JobPostEnum } from "./jobPost.schema";

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

export const applicationConfirmationPayload = z.object({
    name: z.string(),
    applicationNumber: z.string(),
    jobPost: JobPostEnum,
    categoryType: categoryTypeEnum,
    paymentAmount: z.number()
});

export type ApplicationConfirmationPayload = z.infer<typeof applicationConfirmationPayload>;