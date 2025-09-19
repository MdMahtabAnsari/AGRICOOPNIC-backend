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
import { paymentStatusEnum } from "./payment.schema";


const paymentDetailsSchema = z.object({
    id:z.uuid(),
    amount: z.number(),
    paymentId: z.string(),
    url:z.url().optional(),
    orderId: z.string(),
    paymentStatus: paymentStatusEnum,
    createdAt: z.date(),
    updatedAt: z.date(),
    dateTime:z.string().optional()
});

//   id             String   @id @default(uuid())
//   userId         String   @unique
//   user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   submissionDate DateTime @default(now())
//   status         Boolean  @default(false) // true if the form is successfully submitted, false otherwise

const formSubmissionSchema = z.object({
    id: z.uuid(),
    submissionDate: z.date(),
    status: z.boolean()
});

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
    personalDetail: personalDetailSchema,
    paymentDetails: paymentDetailsSchema,
    formSubmission: formSubmissionSchema
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