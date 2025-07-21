import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { PersonalDetailSchema } from "../utils/schemas/personalDetail.schema";

class PersonalDetailRepository {
    async createPersonalDetail(userId: string, data: PersonalDetailSchema) {
        try {
            return await prisma.personalDetail.create({
                data: {
                    userId: userId,
                    ...data
                }
            });
        } catch (error) {
            console.error("Error creating personal detail:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Personal detail");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                } else if (error.code === 'P2025') {
                    throw new NotFoundError("User");
                }
            }
            throw new InternalServerError("Failed to create personal detail");
        }
    }

    async getPersonalDetailByUserId(userId: string) {
        try {
            return await prisma.personalDetail.findFirst({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching personal detail:", error);
            throw new InternalServerError("Failed to fetch personal detail");
        }
    }

    async updatePersonalDetail(userId: string, data: PersonalDetailSchema) {
        try {
            return await prisma.personalDetail.update({
                where: { userId: userId },
                data: data
            });
        } catch (error) {
            console.error("Error updating personal detail:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Personal detail");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                } else if (error.code === 'P2025') {
                    throw new NotFoundError("Personal detail/User");
                }
            }
            throw new InternalServerError("Failed to update personal detail");
        }
    }
}

export const personalDetailRepository = new PersonalDetailRepository();