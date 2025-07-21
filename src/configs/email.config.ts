import serverConfig from "./server.config";

export const emailConfig = {
    host: serverConfig.SMTP_HOST,
    port: serverConfig.SMTP_PORT,
    secure: serverConfig.SMTP_SECURE,
    auth: {
        user: serverConfig.SMTP_USER,
        pass: serverConfig.SMTP_PASSWORD,
    },
    debug: true, // Enable debug logging
    logger: true // Enable logging

};