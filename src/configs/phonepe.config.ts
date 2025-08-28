import serverConfig from './server.config';
import { Env } from 'pg-sdk-node';


export const clientId = serverConfig.PHONEPE_CLIENT_ID;
export const clientSecret = serverConfig.PHONEPE_CLIENT_SECRET;
export const clientVersion = 2;
export const env = Env.SANDBOX;
export const redirectUrl = "http://localhost:3000/api/payments/verify-phonepe";

