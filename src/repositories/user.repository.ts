import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { UserSchema } from "../utils/schemas/user.schema";

class UserRepository {
    async createUser(userId: string, data: UserSchema) {
        try {
            return await prisma.user.create({
                data: {
                    userId: userId,
                    ...data
                }
            });
        } catch (error) {
            console.error("Error creating user:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("User");
                }
                else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to create user");
        }
    }

    async updateUser(userId: string, data: UserSchema) {
        try {
            return await prisma.user.update({
                where: { userId: userId },
                data: data
            });
        } catch (error) {
            console.error("Error updating user:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestError("User already exists");
                }
                else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to update user");
        }
    }

    async getUserById(userId: string) {
        try {
            return await prisma.user.findFirst({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching user:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to fetch user");
        }
    }

    async isEmailExists(email: string) {
        try {
            const user = await prisma.user.findFirst({
                where: { email: email }
            });
            return !!user; // Returns true if user exists, false otherwise
        } catch (error) {
            console.error("Error checking email existence:", error);
            throw new InternalServerError("Failed to check email existence");
        }
    }

    async isPhoneExists(phone: string) {
        try {
            const user = await prisma.user.findFirst({
                where: { phone: phone }
            });
            return !!user; // Returns true if user exists, false otherwise
        } catch (error) {
            console.error("Error checking phone existence:", error);
            throw new InternalServerError("Failed to check phone existence");
        }
    }

    async isAadhaarExists(aadhaar: string) {
        try {
            const user = await prisma.user.findFirst({
                where: { aadhaar: aadhaar }
            });
            return !!user; // Returns true if user exists, false otherwise
        } catch (error) {
            console.error("Error checking Aadhaar existence:", error);
            throw new InternalServerError("Failed to check Aadhaar existence");
        }
    }

    async deleteUser(userId: string) {
        try {
            return await prisma.user.delete({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to delete user");
        }
    }
}

export const userRepository = new UserRepository();

