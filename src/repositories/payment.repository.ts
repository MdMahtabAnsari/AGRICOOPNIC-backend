import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError, NotFoundError, BadRequestError, ConflictError } from "../utils/errors";
import { PaymentSchema } from "../utils/schemas/payment.schema";
import type { PaymentStatusEnum } from "../utils/schemas/payment.schema";
import { CategoryTypeEnum } from "../utils/schemas/category.schema";


class PaymentRepository {
    async createPayment(userId: string, paymentData: PaymentSchema) {
        try {
            return await prisma.payment.create({
                data: {
                    ...paymentData,
                    userId,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Payment already exists with this order ID");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided for payment creation");
                }

            }
            console.error("Error creating payment:", error);
            throw new InternalServerError("Failed to create payment");
        }
    }

    async updatePaymentIdAndStatus(orderId: string, paymentId: string, paymentStatus: PaymentStatusEnum) {
        try {
            const updatedPayment = await prisma.payment.update({
                where: { orderId },
                data: { paymentId, paymentStatus },
            });
            return updatedPayment;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Payment not found for the given order ID");
                }
            }
            console.error("Error updating payment ID:", error);
            throw new InternalServerError("Failed to update payment ID");
        }
    }

    async updateCustomPaymentStatus(orderId: string,paymentId:string,url:string,dateTime:Date, paymentStatus: PaymentStatusEnum) {
        try {
            const updatedPayment = await prisma.payment.update({
                where: { orderId },
                data: { paymentId, url, dateTime, paymentStatus },
            });
            return updatedPayment;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Payment not found for the given order ID");
                }
            }
            console.error("Error updating payment ID:", error);
            throw new InternalServerError("Failed to update payment ID");
        }
    }

    async getUserPayments(userId: string) {
        try {
            const payments = await prisma.payment.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });
            return payments;
        } catch (error) {
            console.error("Error fetching user payments:", error);
            throw new InternalServerError("Failed to fetch user payments");
        }
    }

    async getUserSuccessfulPaymentWithCategory(userId: string, category: CategoryTypeEnum) {
        try {
            const payments = await prisma.payment.findFirst({
                where: { userId, category, paymentStatus: 'COMPLETED' },
            });
            return payments;
        } catch (error) {
            console.error("Error fetching user payments with category:", error);
            throw new InternalServerError("Failed to fetch user payments with category");
        }
    }

    async getUserSuccessfulPayments(userId: string) {
        try {
            const payments = await prisma.payment.findMany({
                where: {
                    userId,
                    paymentStatus: 'COMPLETED',
                },
                orderBy: { createdAt: 'desc' },
            });
            return payments;
        } catch (error) {
            console.error("Error fetching user successful payments:", error);
            throw new InternalServerError("Failed to fetch user successful payments");
        }
    }

    async isLastPaymentCompleted(userId: string) {
        try {
            const lastPayment = await prisma.payment.findFirst({
                where: { userId },
                orderBy: { createdAt: 'desc' },
            });

            if (!lastPayment) {
                return false; // No payments found
            }

            return lastPayment.paymentStatus === 'COMPLETED';
        } catch (error) {
            console.error("Error checking last payment status:", error);
            throw new InternalServerError("Failed to check last payment status");
        }
    }
}


export const paymentRepository = new PaymentRepository();