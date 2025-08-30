import { verify } from 'jsonwebtoken';
import serverConfig from '../configs/server.config';
import { Request } from 'express';
import { JwtPayloadSchema,JwtResetPayloadSchema } from '../utils/schemas/jwt.payload.schema';
import { InternalServerError, UnauthorisedError, AppError } from '../utils/errors';


export const getUserFromAccessToken = (req: Request) => {

    try {
        const authToken = req.cookies.accessToken;
        if (!authToken) {
            throw new UnauthorisedError("Access token is missing");
        }
        const decoded = verify(authToken, serverConfig.JWT_SECRET) as JwtPayloadSchema;
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new InternalServerError("Failed to decode access token");
    }
}

export const getUserFromRefreshToken = (req: Request) => {

    try {
        const authToken = req.cookies.refreshToken;
        if (!authToken) {
            throw new UnauthorisedError("Refresh token is missing");
        }

        const decoded = verify(authToken, serverConfig.JWT_SECRET) as JwtPayloadSchema;
        return decoded;
    } catch (error) {
        console.error("Error decoding refresh token:", error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new InternalServerError("Failed to decode refresh token");
    }
}

export const getUserFromResetToken = (req: Request) => {
    try {
        const authToken = req.cookies.resetToken;
        if (!authToken) {
            throw new UnauthorisedError("Reset token is missing");
        }
        const decoded = verify(authToken, serverConfig.JWT_SECRET) as JwtResetPayloadSchema;
        return decoded;
    } catch (error) {
        console.error("Error decoding reset token:", error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new InternalServerError("Failed to decode reset token");
    }
}
