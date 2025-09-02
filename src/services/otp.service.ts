import { emailService } from "../email/email.service";
import { InternalServerError, AppError, NotFoundError, ForbiddenError } from "../utils/errors";
import otpGenerator from 'otp-generator'
import { otpRedis } from "../redis/otp.redis";

class OtpService {
    private generateOtp(length = 6): string {
        try {
            return otpGenerator.generate(length, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
        } catch (error) {
            console.error('Error generating OTP:', error);
            throw new InternalServerError('Failed to generate OTP');
        }
    }
    async sendOtpEmail(email: string) {
        try {
            const otp = this.generateOtp();
            const otpStored = await otpRedis.setOTP(email, otp);
            if (!otpStored) {
                throw new InternalServerError('Failed to store OTP in Redis');
            }
            const expiresIn = 10; // OTP valid for 10 minutes
            await emailService.sendOtpEmail({
                to: email,
                template: {
                    data: {
                        otp,
                        expiresIn
                    }
                }
            });

            return true;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error('Error sending OTP email:', error);
            throw new InternalServerError('Failed to send OTP email');

        }
    }

    async verifyOtp(email: string, otp: string) {
        try {
            const storedOtp = await otpRedis.getOTP(email);
            if (!storedOtp) {
                throw new NotFoundError('OTP not found or expired');
            }
            if (storedOtp !== otp) {
                throw new ForbiddenError('Invalid OTP');
            }
            // Optionally, delete the OTP after successful verification
            await otpRedis.deleteOTP(email); // Clear the OTP
            return true;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error('Error verifying OTP:', error);
            throw new InternalServerError('Failed to verify OTP');
        }
    }
}

export const otpService = new OtpService();