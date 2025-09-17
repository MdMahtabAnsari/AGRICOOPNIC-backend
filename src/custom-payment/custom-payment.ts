import serverConfig from "../configs/server.config";
import { randomUUID } from "crypto";
import { InternalServerError, AppError } from "../utils/errors";

class CustomPaymentService {
    private readonly payeeAddress: null | string;
    private readonly payeeName: null | string
    constructor() {
        if (serverConfig.PAYEE_ADDRESS && serverConfig.PAYEE_NAME) {
            this.payeeAddress = serverConfig.PAYEE_ADDRESS;
            this.payeeName = serverConfig.PAYEE_NAME;
        } else {
            this.payeeAddress = null;
            this.payeeName = null;
        }

    }

    createPaymentRequest(amount: number) {
        try {
            if (!this.payeeAddress || !this.payeeName) {
                throw new InternalServerError("Payee details are not configured properly");
            }
            const orderId = randomUUID();
            return {
                url: `upi://pay?pa=${this.payeeAddress}&pn=${encodeURIComponent(this.payeeName)}&tn=${encodeURIComponent(orderId)}&am=${amount.toFixed(2)}&cu=INR`,
                orderId
            };
        } catch (error) {
            console.error("Error creating payment request:", error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to create payment request");
        }
    }
}


export const customPaymentService = new CustomPaymentService();

