import serverConfig from './server.config';
import { Env } from 'pg-sdk-node';


export const clientId = serverConfig.PHONEPE_CLIENT_ID;
export const clientSecret = serverConfig.PHONEPE_CLIENT_SECRET;
export const clientVersion = 2;
export const env = Env.PRODUCTION;
export const redirectUrl = `${serverConfig.REDIRECT_URL}/api/payments/verify-phonepe`;

