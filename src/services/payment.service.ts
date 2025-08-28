import { paymentRepository } from "../repositories/payment.repository";
import { InternalServerError, AppError, ForbiddenError, BadRequestError, NotFoundError } from "../utils/errors";
import { RoutePaymentSchema, VerifyPaymentSchema } from "../utils/schemas/payment.schema";
import { razorpayService } from "../razorpay/razorpay";
import { feesRepository } from "../repositories/fees.repository";
import { phonePeService } from "../phonepe/phonepe";
import { randomUUID } from "crypto";


class PaymentService {
    private generateShortReceipt(userId: string): string {
        const timestamp = Date.now().toString().slice(-8); // Last 8 digits
        const userIdShort = userId.slice(-10); // Last 10 characters of userId
        return `rcpt_${userIdShort}_${timestamp}`.substring(0, 40); // Ensure max 40 chars
    }
    async createPayment(userId: string, paymentData: RoutePaymentSchema) {
        try {
            const category = await feesRepository.getFeesByCategory(paymentData.category);
            if (!category) {
                throw new BadRequestError("Invalid category type");
            }
            if (category.amount === 0) {
                const freeOrderId = `free_${userId}_${Date.now()}`;
                const payment = await paymentRepository.createPayment(userId, {
                    amount: 0,
                    paymentId: `free_payment_${freeOrderId}`,
                    orderId: freeOrderId,
                    category: paymentData.category,
                    paymentStatus: 'COMPLETED',
                });
                return {
                    order: {
                        id: freeOrderId,
                        amount: 0,
                        currency: "INR",
                        receipt: `free_receipt_${userId}`,
                        status: 'paid'
                    },
                    payment,
                    isFree: true
                }
            }
            const receipt = this.generateShortReceipt(userId);

            const order = await razorpayService.createOrder(category.amount, "INR", receipt, {
                name: paymentData.name,
                email: paymentData.email,
                contact: paymentData.contact
            });

            if (!order) {
                throw new InternalServerError("Payment initiation failed");
            }

            const payment = await paymentRepository.createPayment(userId, {
                amount: category.amount,
                orderId: order.id,
                category: paymentData.category,
                paymentStatus: 'PENDING',
            });

            return {
                order,
                payment,
                isFree: false
            }
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Payment processing failed");
        }
    }

    async verifyPayment(data: VerifyPaymentSchema) {
        try {
            const isValidSignature = razorpayService.verifyPaymentSignature(data.orderId, data.paymentId, data.signature);
            if (!isValidSignature) {
                throw new ForbiddenError("Invalid payment signature");
            }

            const updatedPayment = await paymentRepository.updatePaymentIdAndStatus(data.orderId, data.paymentId, 'COMPLETED');

            return updatedPayment;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Payment verification failed");
        }
    }

    async getUserSuccessfulPayments(userId: string) {
        try {
            const payments = await paymentRepository.getUserSuccessfulPayments(userId);
            if (payments.length === 0) {
                throw new NotFoundError("successful payments");
            }
            return payments;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching user successful payments:", error);
            throw new InternalServerError("Failed to fetch user successful payments");
        }
    }

    async createPhonepePayment(userId: string, paymentData: RoutePaymentSchema) {
        try {
            const category = await feesRepository.getFeesByCategory(paymentData.category);
            if (!category) {
                throw new BadRequestError("Invalid category type");
            }

            if (category.amount === 0) {
                const orderId = randomUUID();
                const payment = await paymentRepository.createPayment(userId, {
                    amount: 0,
                    paymentId: orderId,
                    orderId: orderId,
                    category: paymentData.category,
                    paymentStatus: 'COMPLETED',
                });
                return {
                    payment,
                    isFree: true
                }
            }

            const order = await phonePeService.createOrder(category.amount, {
                name: paymentData.name,
                email: paymentData.email,
                contact: paymentData.contact
            });

            if (!order) {
                return new InternalServerError("Payment initiation failed");
            }

            const payment = await paymentRepository.createPayment(userId, {
                amount: category.amount,
                orderId: order.orderId,
                category: paymentData.category,
                paymentStatus: 'PENDING',
            });

            return {
                checkoutPageUrl: order.checkoutPageUrl,
                payment,
                isFree: false
            }


        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Payment processing failed");
        }
    }

    async verifyPhonepePayment(orderId: string) {
        try {
            const status = await phonePeService.verifyPayment(orderId);
            console.log("Payment verification status:", status.state);
            if (status.state === 'COMPLETED') {
                return await paymentRepository.updatePaymentIdAndStatus(orderId, status.paymentDetails[0].transactionId, 'COMPLETED');
            }
            else if (status.state === 'FAILED') {
                return await paymentRepository.updatePaymentIdAndStatus(orderId, status.paymentDetails[0].transactionId, 'FAILED');
            }
            return null;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Payment verification failed");
        }
    }
}
export const paymentService = new PaymentService();



