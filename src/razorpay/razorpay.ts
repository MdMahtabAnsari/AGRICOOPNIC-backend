import Razorpay from "razorpay";
import { razorpayConfig } from "../configs/razorpay.config";
import crypto from "crypto";

export interface CustomerDetails {
    name?: string;
    email?: string;
    contact?: string; // Mobile number
}

class RazorpayService {
    private razorpay: Razorpay;

    constructor() {
        this.razorpay = new Razorpay(razorpayConfig);
    }

    async createOrder(amount: number, currency: string, receipt: string, customerDetails?: CustomerDetails) {
        try {
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
            throw error;
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