import Razorpay from "razorpay";
import { razorpayConfig } from "../configs/razorpay.config";
import crypto from "crypto";
import { InternalServerError,AppError } from "../utils/errors";

export interface CustomerDetails {
    name?: string;
    email?: string;
    contact?: string; // Mobile number
}

class RazorpayService {
    private razorpay: Razorpay|null;

    constructor() {
        if(razorpayConfig.key_id && razorpayConfig.key_secret){
            this.razorpay = new Razorpay(razorpayConfig);
        } else {
            this.razorpay = null;
        }
    }

    async createOrder(amount: number, currency: string, receipt: string, customerDetails?: CustomerDetails) {
        try {
            if(this.razorpay === null) {
                throw new InternalServerError("Razorpay is not initialized");
            }
            const options = {
                amount: amount * 100, // Amount in paise
                currency,
                receipt,
                ...(customerDetails && {
                    notes: {
                        name: customerDetails.name || '',
                        email: customerDetails.email || '',
                        contact: customerDetails.contact || '',
                    }
                })
            };
            return await this.razorpay.orders.create(options);
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError('Failed to create Razorpay order');
        }
    }

    verifyPaymentSignature(orderId: string, paymentId: string, signature: string) {
        if (!razorpayConfig.key_secret) {
            throw new Error("Razorpay key secret is not configured");
        }

        const generatedSignature = crypto.createHmac("sha256", razorpayConfig.key_secret)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");
        return generatedSignature === signature;
    }

}

export const razorpayService = new RazorpayService();