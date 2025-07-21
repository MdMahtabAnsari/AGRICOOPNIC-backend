import { transporter } from "./nodeMailerClient";
import { emailTemplateService } from "./emailTemplate.service";
import { InternalServerError } from "../utils/errors";
import { MJMLOtp,MJMLConfirmation } from "./emailTemplate.service";


export interface EmailData{
    to:string;
    template:MJMLOtp
}

export interface ConfirmationEmailData {
    to: string;
    template: MJMLConfirmation;
}

class EmailService {
    async sendOtpEmail(data: EmailData) {
        try{
            const htmlContent = await emailTemplateService.otpMjmlToHtml(data.template);
            const mailOptions = {
                from: process.env.SMTP_FROM,
                to: data.to,
                subject: 'Your OTP Code',
                html: htmlContent
            };
            return await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending OTP email:', error);
            throw new InternalServerError('Failed to send OTP email');
        }
    }

    async sendConfirmationEmail(data: ConfirmationEmailData) {
        try {
            const htmlContent = await emailTemplateService.confirmationMjmlToHtml(data.template);
            const mailOptions = {
                from: process.env.SMTP_FROM,
                to: data.to,
                subject: 'Confirmation Email',
                html: htmlContent
            };
            return await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            throw new InternalServerError('Failed to send confirmation email');
        }
    }
}

export const emailService = new EmailService();