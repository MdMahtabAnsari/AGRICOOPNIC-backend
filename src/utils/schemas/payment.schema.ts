import { z } from 'zod/v4';
import { categoryTypeEnum } from './category.schema';
import { name, email, phone } from './common.schema';




export const paymentStatusEnum = z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED'], { message: 'Invalid payment status' });

export type PaymentStatusEnum = z.infer<typeof paymentStatusEnum>;
export const routePaymentSchema = z.object({
    category: categoryTypeEnum,
    name: name,
    email: email,
    contact: phone,

});

export type RoutePaymentSchema = z.infer<typeof routePaymentSchema>;

export const customPaymentSchema = routePaymentSchema.omit({
    name: true,
    email: true,
    contact: true,
})

export type CustomPaymentSchema = z.infer<typeof customPaymentSchema>;


export const paymentSchema = z.object({
    category: categoryTypeEnum,
    paymentId: z.string().optional(),
    orderId: z.string(),
    paymentStatus: paymentStatusEnum,
    amount: z.number().min(0, { message: 'Amount must be a positive number' }),

});

export type PaymentSchema = z.infer<typeof paymentSchema>;


export const verifyPaymentSchema = z.object({
    orderId: z.string(),
    paymentId: z.string(),
    signature: z.string()
});

export type VerifyPaymentSchema = z.infer<typeof verifyPaymentSchema>;

export const orderIdObject = z.object({
    orderId: z.uuid()
});

export type OrderIdObject = z.infer<typeof orderIdObject>;

export const customVerifyPaymentSchema = verifyPaymentSchema.omit({
    signature: true
}).extend({
    paymentId: z
        .string()
        .min(12, "paymentId must be at least 12 characters")
        .max(22, "paymentId cannot be longer than 22 characters")
        .regex(/^[A-Za-z0-9]+$/, "paymentId must be alphanumeric only"),
    url: z.url({ error: "Invalid URL format" }),
    dateTime: z.coerce.date().refine((date) => date <= new Date(), { message: "dateTime cannot be in the future" })
});

export type CustomVerifyPaymentSchema = z.infer<typeof customVerifyPaymentSchema>;


export const bankPaymentSchema = customVerifyPaymentSchema.omit({orderId: true}).extend({
    category: categoryTypeEnum
});

export type BankPaymentSchema = z.infer<typeof bankPaymentSchema>;
