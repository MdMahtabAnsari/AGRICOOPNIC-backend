import serverConfig from "../configs/server.config";
import { randomUUID } from "crypto";

class CustomPaymentService {
    private readonly payeeAddress: null | string;
    private readonly payeeName: null | string
    constructor() {
        if (!serverConfig.PAYEE_ADDRESS || !serverConfig.PAYEE_NAME) {
            throw new Error("Payee details are not configured properly.");
        }
        this.payeeAddress = serverConfig.PAYEE_ADDRESS;
        this.payeeName = serverConfig.PAYEE_NAME;
    }

    createPaymentRequest(amount: number) {
        if (!this.payeeAddress || !this.payeeName) {
            throw new Error("Payee details are not configured properly.");
        }
        const orderId = randomUUID();
        return {
            url: `upi://pay?pa=${this.payeeAddress}&pn=${encodeURIComponent(this.payeeName)}&tn=${encodeURIComponent(orderId)}&am=${amount.toFixed(2)}&cu=INR`,
            orderId
        };
    }
}


export const customPaymentService = new CustomPaymentService();

