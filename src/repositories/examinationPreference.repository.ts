import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError, NotFoundError, BadRequestError, ConflictError } from "../utils/errors";
import { ExaminationPreferenceSchema } from "../utils/schemas/examinationPreference.schema";

class ExaminationPreferenceRepository {
    async createExaminationPreference(userId: string, data: ExaminationPreferenceSchema) {
        try {
            const examinationPreference = await prisma.examinationPreference.create({
                data: {
                    userId,
                    ...data
                }
            });
            return examinationPreference;
        } catch (error) {
            console.error("Error creating examination preference:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Examination preference already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                } else if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to create examination preference");
        }
    }

    async getExaminationPreferenceByUserId(userId: string) {
        try {
            return await prisma.examinationPreference.findMany({
                where: { userId }
            });

        } catch (error) {
            console.error("Error fetching examination preference:", error);

            throw new InternalServerError("Failed to fetch examination preference");
        }
    }

    async updateExaminationPreference(userId: string, data: ExaminationPreferenceSchema) {
        try {
            return await prisma.examinationPreference.updateMany({
                where: { userId },
                data
            });
        } catch (error) {
            console.error("Error updating examination preference:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Examination preference already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
        }
    }

    async getExaminationPreferenceByPreferenceTypeAndUserId(preferenceType: ExaminationPreferenceSchema['preferenceType'], userId: string) {
        try {
            return await prisma.examinationPreference.findFirst({
                where: { preferenceType, userId }
            });
        } catch (error) {
            console.error("Error fetching examination preference:", error);
            throw new InternalServerError("Failed to fetch examination preference");
        }
    }
}

export const examinationPreferenceRepository = new ExaminationPreferenceRepository();