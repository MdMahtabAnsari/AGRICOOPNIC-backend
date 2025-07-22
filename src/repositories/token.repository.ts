import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { TokenSchema } from "../utils/schemas/token.schema";


class TokenRepository {
    async createToken(data: TokenSchema) {
        try {
            return await prisma.token.create({
                data:{
                    userId: data.userId,
                    token: data.token,
                    expiredAt: data.expiredAt
                }
            });
        } catch (error) {
            console.error("Error creating token:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Token already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to create token");
        }
    }

    async getTokenByUserId(userId: string) {
        try {
            return await prisma.token.findFirst({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching token:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Token not found");
                }
            }
            throw new InternalServerError("Failed to fetch token");
        }
    }

    async deleteToken(userId: string) {
        try {
            return await prisma.token.delete({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error deleting token:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Token not found");
                }
            }
            throw new InternalServerError("Failed to delete token");
        }
    }
}

export const tokenRepositoy = new TokenRepository();