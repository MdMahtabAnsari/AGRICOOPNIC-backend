import { StandardCheckoutClient, StandardCheckoutPayRequest, MetaInfo } from 'pg-sdk-node';
import { clientId, clientSecret, clientVersion, env, redirectUrl } from '../configs/phonepe.config';
import { CustomerDetails } from '../razorpay/razorpay';
import { randomUUID } from 'crypto';
import { InternalServerError } from '../utils/errors';

class PhonePeService {
    private client: StandardCheckoutClient;

    constructor() {
        this.client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);
    }

    private mapCustomerDetailsToMetaInfo(customerDetails: CustomerDetails): MetaInfo {
        // Map your fields to udf1-udf5 as needed
        return new MetaInfo(
            customerDetails.name ?? '',
            customerDetails.email ?? '',
            customerDetails.contact ?? '',
            '', // udf4
            ''  // udf5
        );
    }

    async createOrder(amount: number, customerDetails?: CustomerDetails) {
        try {
            const orderId = randomUUID();
            const metaInfo = customerDetails
                ? this.mapCustomerDetailsToMetaInfo(customerDetails)
                : new MetaInfo('', '', '', '', '');
            const request: StandardCheckoutPayRequest = StandardCheckoutPayRequest.builder()
                .merchantOrderId(orderId)
                .amount(amount*100)
                .metaInfo(metaInfo)
                .redirectUrl(`${redirectUrl}?orderId=${orderId}`).build();

            const response = await this.client.pay(request);
            return {
                checkoutPageUrl : response.redirectUrl,
                orderId:orderId
            }
        } catch (error) {
            console.error('Error creating order:', error);
            throw new InternalServerError('Failed to create order');
        }
    }

    async verifyPayment(orderId: string) {
        try {
            return await this.client.getOrderStatus(orderId)
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw new InternalServerError('Failed to verify payment');
        }
    }
}

export const phonePeService = new PhonePeService();