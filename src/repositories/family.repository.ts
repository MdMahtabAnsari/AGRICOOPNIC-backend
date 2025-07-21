import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { FamilySchema } from "../utils/schemas/family.schema";

class FamilyRepository {
    async createFamily(userId: string, data: FamilySchema) {
        try {
            return await prisma.family.create({
                data: {
                    userId: userId,
                    ...data
                }
            });
        } catch (error) {
            console.error("Error creating family:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Family already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to create family");
        }
    }

    async getFamilyByUserId(userId: string) {
        try {
            return await prisma.family.findUnique({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching family:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Family not found");
                }
            }
            throw new InternalServerError("Failed to fetch family");
        }
    }

    async updateFamily(userId: string, data: FamilySchema) {
        try {
            return await prisma.family.update({
                where: { userId: userId },
                data: data
            });
        } catch (error) {
            console.error("Error updating family:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError('Family');
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to update family");
        }
    }
}

export const familyRepository = new FamilyRepository();