# Application Form Backend Setup

## Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** package manager  
  Install globally:

  ```bash
  npm i -g pnpm
  ```

## Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **(Optional) Start database and Redis with Docker:**

   ```bash
   pnpm run db:up
   pnpm run redis:up
   ```

## Environment Configuration

1. **Configure your `.env` file:**  
   Copy the example below and update values as needed.

   ```env
   DATABASE_URL="postgresql://form_user:form_pass@localhost:5432/form_db"
   PORT=3000
   REDIS_URL="redis://localhost:6379"
   SMTP_HOST="SMTP HOST"
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER="SMTP USER"
   SMTP_PASSWORD="SMTP Password"
   SMTP_FROM="SMTP From"

   CORS_ORIGIN="http://localhost:5173"
   CORS_CREDENTIALS=true
   CORS_HEADERS="Content-Type, Authorization, X-Requested-With, Accept, Origin, Access-Control-Allow-Origin, Access-Control-Allow-Credentials"
   CORS_METHODS="GET, POST, PUT, DELETE, OPTIONS"

   RAZORPAY_KEY_ID="Your RazorPay keyId"
   RAZORPAY_KEY_SECRET="RazorPay key Secret"
   JWT_SECRET="JWT Secret"

   PHONEPE_CLIENT_ID="Phonepe clientId"
   PHONEPE_CLIENT_SECRET="PhonePe client secret"
   FRONTEND_URL="http://localhost:5173"
   REDIRECT_URL="http://localhost:3000"

   NODE_ENV="production"/"developement"
   PAYU_MERCHANT_KEY="PayU Merchant Key"
   PAYU_MERCHANT_SALT="PayU Merchant Salt"
   ```

2. **Run database migration and generate Prisma client:**

   ```bash
   pnpm run db:migrate
   pnpm run db:generate
   ```

## Development

To start the development server, run:

```bash
pnpm run dev
```
