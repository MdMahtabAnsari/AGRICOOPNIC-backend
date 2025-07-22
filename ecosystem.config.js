module.exports = {
    apps: [
        {
            name: "application-form-backend",
            script: "./dist/index.js",
            instances: "max-2", // Uses all cores except 2 (6 instances on e2-standard-8)
            exec_mode: "cluster",
            max_memory_restart: "4G",
            node_args: "--max-old-space-size=4096",
            env_production: {
                NODE_ENV: "production",
                PORT: process.env.PORT || 3000,
                DATABASE_URL: process.env.DATABASE_URL,
                REDIS_URL: process.env.REDIS_URL,
                SMTP_HOST: process.env.SMTP_HOST,
                SMTP_PORT: process.env.SMTP_PORT,
                SMTP_SECURE: process.env.SMTP_SECURE,
                SMTP_USER: process.env.SMTP_USER,
                SMTP_PASSWORD: process.env.SMTP_PASSWORD,
                SMTP_FROM: process.env.SMTP_FROM,
                CORS_ORIGIN: process.env.CORS_ORIGIN,
                CORS_CREDENTIALS: process.env.CORS_CREDENTIALS,
                CORS_HEADERS: process.env.CORS_HEADERS,
                CORS_METHODS: process.env.CORS_METHODS,
                RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
                RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
                JWT_SECRET: process.env.JWT_SECRET,
                APP_TYPE: "api"
            },
            error_file: "logs/api-err.log",
            out_file: "logs/api-out.log",
            log_file: "logs/api-combined.log",
            time: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            merge_logs: true
        },
        {
            name: "application-form-worker",
            script: "./dist/queue/workers/index.js",
            instances: 1,
            exec_mode: "fork",
            max_memory_restart: "2G",
            node_args: "--max-old-space-size=2048",
            env_production: {
                NODE_ENV: "production",
                DATABASE_URL: process.env.DATABASE_URL,
                REDIS_URL: process.env.REDIS_URL,
                SMTP_HOST: process.env.SMTP_HOST,
                SMTP_PORT: process.env.SMTP_PORT,
                SMTP_SECURE: process.env.SMTP_SECURE,
                SMTP_USER: process.env.SMTP_USER,
                SMTP_PASSWORD: process.env.SMTP_PASSWORD,
                SMTP_FROM: process.env.SMTP_FROM,
                RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
                RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
                JWT_SECRET: process.env.JWT_SECRET,
                APP_TYPE: "worker"
            },
            error_file: "logs/worker-err.log",
            out_file: "logs/worker-out.log",
            log_file: "logs/worker-combined.log",
            time: true,
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            restart_delay: 1000,
            autorestart: true
        }
    ]
};
