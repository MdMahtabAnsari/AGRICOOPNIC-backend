import { jwtService } from "./jwt.service";
import { authRepository } from "../repositories/auth.repository";
import { InternalServerError, AppError, NotFoundError, UnauthorisedError } from "../utils/errors";
import { AuthSchema } from "../utils/schemas/auth.schema";

class AuthService {
    async signUp(data: AuthSchema) {
        try {
            const user = await authRepository.signUp(data);
            return {
                id: user.id,
                userId: user.userId
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error signing up:", error);
            throw new InternalServerError("Failed to sign up");
        }
    }

    async signIn(data: AuthSchema) {
        try {
            const isUserExists = await authRepository.getUserById(data.userId);
            if (!isUserExists) {
                throw new NotFoundError("User not found");
            }
            if (data.password !== isUserExists.password) {
                throw new UnauthorisedError("Invalid password");
            }
            // Here you would typically verify the password, but that logic is not included in the original code.
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

    async isUserExists(userId: string) {
        try {
            const exists = await authRepository.isUserExists(userId);
            return exists;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error checking user existence:", error);
            throw new InternalServerError("Failed to check user existence");
        }
    }


}

export const authService = new AuthService();
