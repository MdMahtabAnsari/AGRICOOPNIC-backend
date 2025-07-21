import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { EducationSchema } from "../utils/schemas/education.schema";

class EducationRepository {
    async createEducation(userId: string, data: EducationSchema) {
        try {
            return await prisma.education.create({
                data: {
                    userId: userId,
                    ...data
                }
            });
        } catch (error) {
            console.error("Error creating education:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Education already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                } else if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to create education");
        }
    }

    async getEducationByUserId(userId: string) {
        try {
            return await prisma.education.findMany({
                where: { userId: userId },
            });
        } catch (error) {
            console.error("Error fetching education:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Education not found");
                }
            }
            throw new InternalServerError("Failed to fetch education");
        }
    }

    async updateEducation(userId: string, data: EducationSchema) {
        try {
            return await prisma.education.update({
                where: { userId_qualification: { userId: userId, qualification: data.qualification } },
                data: data
            });
        } catch (error) {
            console.error("Error updating education:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError('Education');
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to update education");
        }
    }
}

export const educationRepository = new EducationRepository();