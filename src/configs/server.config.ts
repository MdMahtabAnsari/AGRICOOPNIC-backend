import { config } from "dotenv";

config();

const serverConfig = {
  PORT: process.env.PORT || 3000,
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
  SMTP_SECURE: process.env.SMTP_SECURE=== 'true',
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM||"m.a.raj58232@gmail.com",
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
  CORS_HEADERS: process.env.CORS_HEADERS?.split(',') || [],
  CORS_METHODS: process.env.CORS_METHODS?.split(',') || [],
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'defaultsecret',
  PHONEPE_CLIENT_ID: process.env.PHONEPE_CLIENT_ID,
  PHONEPE_CLIENT_SECRET: process.env.PHONEPE_CLIENT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL||"http://localhost:5173",
  REDIRECT_URL: process.env.REDIRECT_URL||"http://localhost:3000",
  PAYU_MERCHANT_KEY: process.env.PAYU_MERCHANT_KEY,
  PAYU_MERCHANT_SALT: process.env.PAYU_MERCHANT_SALT,
};
export default serverConfig;
