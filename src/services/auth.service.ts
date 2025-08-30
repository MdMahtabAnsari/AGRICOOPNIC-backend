import { jwtService } from "./jwt.service";
import { authRepository } from "../repositories/auth.repository";
import { InternalServerError, AppError, NotFoundError, UnauthorisedError } from "../utils/errors";
import { SignUpSchema, SignInSchema } from "../utils/schemas/auth.schema";
import { hash, verify } from "argon2";
import { UserIdEmailObjectWithOptional } from "../utils/schemas/auth.schema";
import { otpService } from "./otp.service";

class AuthService {
    async signUp(data: SignUpSchema) {
        try {
            const hashedPassword = await hash(data.password);
            const user = await authRepository.signUp({ ...data, password: hashedPassword });
            return {
                id: user.id,
                userId: user.userId,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error signing up:", error);
            throw new InternalServerError("Failed to sign up");
        }
    }

    async signIn(data: SignInSchema) {
        try {
            const isUserExists = await authRepository.getUserbyIdentifier(data.identifier);
            if (!isUserExists) {
                throw new NotFoundError("User not found");
            }
            const isPasswordValid = await verify(isUserExists.password,data.password);
            if (!isPasswordValid) {
                throw new UnauthorisedError("Invalid password");
            }
            const accessToken = jwtService.createAccessToken({ id: isUserExists.id, userId: isUserExists.userId });
            const refreshToken = await jwtService.createRefreshToken({ id: isUserExists.id, userId: isUserExists.userId });
            return { accessToken, refreshToken };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error signing in:", error);
            throw new InternalServerError("Failed to sign in");
        }
    }

    async refresh(userId: string) {
        try {
            const isUserExists = await authRepository.getUserById(userId);
            if (!isUserExists) {
                throw new NotFoundError("User not found");
            }
            const refreshToken = await jwtService.createRefreshToken({ id: isUserExists.id, userId: isUserExists.userId });
            const accessToken = jwtService.createAccessToken({ id: isUserExists.id, userId: isUserExists.userId });
            return { accessToken, refreshToken };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error refreshing token:", error);
            throw new InternalServerError("Failed to refresh token");
        }
    }

    async verifyOtp(email: string, otp: string) {
        try {
            const isValid = await otpService.verifyOtp(email, otp);
            const resetToken = jwtService.createResetToken(email);
            return { isValid, resetToken };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error verifying OTP:", error);
            throw new InternalServerError("Failed to verify OTP");
        }
    }

    async isLoggedIn(userId: string) {
        try {
            const isUserExists = await authRepository.getUserById(userId);
            if (!isUserExists) {
                throw new NotFoundError("User not found");
            }
            return true;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error checking login status:", error);
            throw new InternalServerError("Failed to check login status");
        }
    }

    async isUserExists(data: UserIdEmailObjectWithOptional) {
        try {
            const exists = await authRepository.isUserExists(data);
            return exists;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error checking user existence:", error);
            throw new InternalServerError("Failed to check user existence");
        }
    }

    async resetPassword(email: string, password: string) {
        try {
            const hashedPassword = await hash(password);
            const result = await authRepository.updatePassword(email, hashedPassword);
            return result;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error resetting password:", error);
            throw new InternalServerError("Failed to reset password");
        }
    }

}

export const authService = new AuthService();
