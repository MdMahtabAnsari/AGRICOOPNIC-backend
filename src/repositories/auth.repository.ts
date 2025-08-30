import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { SignUpSchema} from "../utils/schemas/auth.schema";
import { UserIdEmailObjectWithOptional } from "../utils/schemas/auth.schema";


class AuthRepository {
    async signUp(data: SignUpSchema) {
        try {
            return await prisma.auth.create({
                data: {
                    userId: data.userId,
                    password: data.password,
                    email: data.email
                }
            });
        } catch (error) {
            console.error("Error signing up:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("User already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to sign up");
        }
    }

    async isUserExists(data: UserIdEmailObjectWithOptional) {
        try {
            const user = await prisma.auth.findFirst({
                where: {
                    OR: [
                        { userId: data.userId },
                        { email: data.email }
                    ]
                }
            });
            return !!user;
        } catch (error) {
            console.error("Error checking user existence:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to check user existence");
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await prisma.auth.findFirst({
                where: { userId: userId }
            });
            if (!user) {
                throw new NotFoundError("User not found");
            }
            return user;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to fetch user by ID");
        }
    }

    async getUserbyIdentifier(identifier: string) {
        try {
            const user = await prisma.auth.findFirst({
                where: {
                    OR: [
                        { userId: identifier },
                        { email: identifier }
                    ]
                }
            });
            if (!user) {
                throw new NotFoundError("User not found");
            }
            return user;
        } catch (error) {
            console.error("Error fetching user by identifier:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to fetch user by identifier");
        }
    }

    async updatePassword(email: string, password: string) {
        try {
            return await prisma.auth.update({
                where: { email: email },
                data: { password: password }
            });
        } catch (error) {
            console.error("Error updating password:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to update password");
        }
    }
}

export const authRepository = new AuthRepository();