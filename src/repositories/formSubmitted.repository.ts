import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";

class FormSubmittedRepository {
    async makeFormSubmitted(userId: string) {
        try {
            return await prisma.formSubmitted.create({
                data:{
                    userId: userId,
                    status: true
                }
            });
        } catch (error) {
            console.error("Error creating form progress:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Form progress already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to create form progress");
        }
    }

    async getFormSubmittedByUserId(userId: string) {
        try {
            return await prisma.formSubmitted.findUnique({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching form submitted:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Form submitted not found");
                }
            }
            throw new InternalServerError("Failed to fetch form submitted");
        }
    }
}

export const formSubmittedRepository = new FormSubmittedRepository();