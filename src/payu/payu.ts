import { PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT } from "../configs/payu.config";
import { InternalServerError, AppError } from "../utils/errors";
import { randomUUID, createHash } from 'crypto';
import { payUClient } from "./api";
import { unserialize } from 'php-serialize'
import { HashSchema } from "../utils/schemas/payment.schema";

interface CustomerDetails {
    name: string;
    email: string;
    productInfo: string;
}
interface PayUVerifyPaymentResponse {
    status: string;
    msg: string;
    transaction_details: Record<string, {
        status: string;
        mihpayid: string;
        [key: string]: unknown;
    }>;
}
class PayUService {

    private generateHash(amount: number, customerDetails: CustomerDetails, orderId: string): string {
        const salt = PAYU_MERCHANT_SALT;
        const key = PAYU_MERCHANT_KEY;
        const txnid = orderId;
        const productinfo = customerDetails.productInfo;
        const firstname = customerDetails.name;
        const email = customerDetails.email;
        const udf1 = '';
        const udf2 = '';
        const udf3 = '';
        const udf4 = '';
        const udf5 = '';
        const emptyFields = Array(5).fill('').join('|'); // only 5 empties

        const formattedAmount = Number(amount).toFixed(2); // Ensure two decimal places

        const hashString = `${key}|${txnid}|${formattedAmount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}|${emptyFields}|${salt}`;

        return createHash("sha512").update(hashString).digest("hex");
    }

    private generateVerifyHash(orderId: string) {
        const key = PAYU_MERCHANT_KEY;
        const command = "verify_payment";
        const hashString = `${key}|${command}|${orderId}|${PAYU_MERCHANT_SALT}`;
        return createHash("sha512").update(hashString).digest("hex");
    }
    async createPayment(amount: number, customerDetails: CustomerDetails) {
        try {
            if (!PAYU_MERCHANT_KEY || !PAYU_MERCHANT_SALT) {
                throw new InternalServerError("PayU is not configured properly");
            }
            const orderId = randomUUID();
            const hash = this.generateHash(amount, customerDetails, orderId);
            return {
                orderId,
                hash
            };
        } catch (error) {
            console.error('Error creating payment:', error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to create payment");
        }
    }
    async verifyPayment(orderId: string) {
        try {
            if (!PAYU_MERCHANT_KEY || !PAYU_MERCHANT_SALT) {
                throw new InternalServerError("PayU is not configured properly");
            }
            const verifyHash = this.generateVerifyHash(orderId);
            const response = await payUClient.post('/merchant/postservice', new URLSearchParams({
                key: PAYU_MERCHANT_KEY,
                var1: orderId,
                hash: verifyHash,
                command: 'verify_payment'
            }));
            const data: PayUVerifyPaymentResponse = unserialize(response.data);
            console.log('PayU verify payment response:', data);
            return {
                status: data.transaction_details[orderId]?.status,
                paymentId: data.transaction_details[orderId]?.mihpayid
            }
        }
        catch (error) {
            console.error('Error verifying payment:', error);
            throw new InternalServerError("Failed to verify payment");
        }
    }

    verifyLinkPaymentHash(data: HashSchema) {
        const salt = PAYU_MERCHANT_SALT;
        const key = data.key;
        const txnid = data.txnid;
        const productinfo = data.productinfo;
        const firstname = data.firstname;
        const email = data.email;
        const amount = data.amount;
        const udf1 = '';
        const udf2 = '';
        const udf3 = '';
        const udf4 = '';
        const udf5 = '';
        const status = data.status;
        const emptyFields = Array(5).fill('').join('|'); // only 5 empties

        const hashString = `${salt}|${status}|${emptyFields}|${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

        return createHash("sha512").update(hashString).digest("hex") === data.hash;
    }

}

export const payUService = new PayUService();