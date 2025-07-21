import {otpService} from "../services/otp.service";
import {Request, Response,NextFunction} from "express";
import {getAuth} from "@clerk/express";
import {UnauthorisedError} from "../utils/errors";

class OtpController {

    async sendOtpEmail(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const { email } = req.body;
        try {

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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const { email, otp } = req.body;
        try {

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