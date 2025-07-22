import {otpService} from "../services/otp.service";
import {Request, Response,NextFunction} from "express";
import {getUserFromAccessToken} from "../validators/auth.validator";


class OtpController {

    async sendOtpEmail(req: Request, res: Response, next: NextFunction) {
       try {
            getUserFromAccessToken(req);
            const {email} = req.body;
            const result = await otpService.sendOtpEmail(email);
            res.status(201).json({
                message: "OTP sent successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        
       
        try {
            getUserFromAccessToken(req);
            const { email, otp } = req.body;
            const result = await otpService.verifyOtp(email, otp);
            res.status(200).json({
                message: "OTP verified successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const otpController = new OtpController();