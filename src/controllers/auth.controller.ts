import { authService } from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken, getUserFromRefreshToken,getUserFromResetToken } from "../validators/auth.validator";
import { cookieConfigGenerator } from "../configs/cookie.config";
import ms from "ms";
import { jwtService } from "../services/jwt.service";
import { UserIdEmailObjectWithOptional } from "../utils/schemas/auth.schema";
import { otpService } from "../services/otp.service";

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const result = await authService.signUp(data);
            res.status(201).json({
                message: "User signed up successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const { accessToken, refreshToken } = await authService.signIn(data);
            res.cookie('accessToken', accessToken, cookieConfigGenerator({ type: "accessToken", sameSite: "strict", expiresIn: ms('1d') })).cookie('refreshToken', refreshToken, cookieConfigGenerator({ type: "refreshToken", sameSite: "strict", expiresIn: ms('7d') })).json({
                message: "User signed in successfully",
                status: "success",
                isOperational: true,
                data: null,
                statusCode: 200,
            });

        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const user = getUserFromRefreshToken(req);
            const { accessToken, refreshToken } = await authService.refresh(user.userId);
            const accessTokenExpiry = jwtService.getTokenLeftTime(accessToken);
            const refreshTokenExpiry = jwtService.getTokenLeftTime(refreshToken);
            res.cookie('accessToken', accessToken, cookieConfigGenerator({ type: "accessToken", sameSite: "strict", expiresIn: accessTokenExpiry })).cookie('refreshToken', refreshToken, cookieConfigGenerator({ type: "refreshToken", sameSite: "strict", expiresIn: refreshTokenExpiry })).json({
                message: "Tokens refreshed successfully",
                status: "success",
                isOperational: true,
                data: null,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async isLoggedIn(req: Request, res: Response, next: NextFunction) {
        try {
            const user = getUserFromAccessToken(req);
            res.status(200).json({
                message: "User is logged in",
                status: "success",
                isOperational: true,
                data: user,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('accessToken').clearCookie('refreshToken').status(200).json({
                message: "User logged out successfully",
                status: "success",
                isOperational: true,
                data: null,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async isUserExists(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, email } = req.query as UserIdEmailObjectWithOptional;
            const exists = await authService.isUserExists({ userId, email });
            res.status(200).json({
                message: "User existence checked successfully",
                status: "success",
                isOperational: true,
                data: exists,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            const {resetToken,isValid} = await authService.verifyOtp(email, otp);
            const resetTokenTimeLeft = jwtService.getTokenLeftTime(resetToken);
            res.cookie('resetToken', resetToken, cookieConfigGenerator({ type: "resetToken", sameSite: "strict", expiresIn: resetTokenTimeLeft })).status(200).json({
                message: "OTP verified successfully",
                status: "success",
                isOperational: true,
                data: isValid,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async sendOtpEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
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

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = getUserFromResetToken(req);
            const {password } = req.body;
            const result = await authService.resetPassword(email, password);
            res.clearCookie('resetToken').status(200).json({
                message: "Password reset successfully",
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

export const authController = new AuthController();
