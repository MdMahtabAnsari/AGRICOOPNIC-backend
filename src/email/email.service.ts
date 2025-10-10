import { transporter } from "./nodeMailerClient";
import { emailTemplateService } from "./emailTemplate.service";
import { InternalServerError } from "../utils/errors";
import { MJMLOtp, MJMLConfirmation, MJMLApplicationConfirmation, MJMLContact } from "./emailTemplate.service";
import serverConfig from "../configs/server.config";
import { render } from "@react-email/components";
import { ConfirmationEmail } from "../../email/conformation"

export interface EmailData {
    to: string;
    template: MJMLOtp
}

export interface ConfirmationEmailData {
    to: string;
    template: MJMLConfirmation;
}

export interface ApplicationConfirmationEmailData {
    to: string;
    template: MJMLApplicationConfirmation;
}

export interface ContactEmailData {
    to: string;
    template: MJMLContact;
}

class EmailService {
    async sendOtpEmail(data: EmailData) {
        try {
            const htmlContent = await emailTemplateService.otpMjmlToHtml(data.template);
            const mailOptions = {
                from: serverConfig.SMTP_FROM,
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
                from: serverConfig.SMTP_FROM,
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

    async sendApplicationConfirmationEmail(data: ApplicationConfirmationEmailData) {
        try {
            const htmlContent = await emailTemplateService.applicationConfirmationMjmlToHtml(data.template);
            const mailOptions = {
                from: serverConfig.SMTP_FROM,
                to: data.to,
                subject: 'Application Confirmation Email',
                html: htmlContent
            };
            return await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending application confirmation email:', error);
            throw new InternalServerError('Failed to send application confirmation email');
        }
    }

    async sendContactEmail(data: ContactEmailData) {
        try {
            const htmlContent = await emailTemplateService.contactMjmlToHtml(data.template);
            const mailOptions = {
                from: serverConfig.SMTP_FROM,
                to: data.to,
                subject: 'Contact Us Form Submission',
                html: htmlContent
            };
            return await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending contact email:', error);
            throw new InternalServerError('Failed to send contact email');
        }
    }

    async sendConfirmationEmailReact(data: ConfirmationEmailData) {
        try {
            const mailOptions = {
                from: serverConfig.SMTP_FROM,
                to: data.to,
                subject: 'Your OTP Code',
                html: await render(ConfirmationEmail(data.template.data))
            };
            return await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending OTP email:', error);
            throw new InternalServerError('Failed to send OTP email');
        }
    }
}

export const emailService = new EmailService();