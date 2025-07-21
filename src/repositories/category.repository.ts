import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import {CategorySchema} from "../utils/schemas/category.schema";

class CategoryRepository {
    async createCategory(userId:string,data: CategorySchema) {
        try {
            return await prisma.category.create({
                data: {
                    userId: userId,
                    ...data
                }
            });
        } catch (error) {
            console.error("Error creating category:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Category already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
                else if (error.code === 'P2025') {
                    throw new NotFoundError("User");
                }

            }
            throw new InternalServerError("Failed to create category");
        }
    }

    async getCategoryByUserId(userId: string) {
        try {
            return await prisma.category.findUnique({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching category:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Category not found");
                }
            }
            throw new InternalServerError("Failed to fetch category");
        }
    }

    async updateCategory(userId:string, data: CategorySchema) {
        try {
            return await prisma.category.update({
                where: { userId: userId },
                data: data
            });
        } catch (error) {
            console.error("Error updating category:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                   throw new ConflictError('Category');
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
                else if (error.code === 'P2025') {
                    throw new NotFoundError("Category not found");
                }
            }
            throw new InternalServerError("Failed to update category");
        }
    }
}

export const categoryRepository = new CategoryRepository();