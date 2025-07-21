import {categoryRepository} from "../repositories/category.repository";
import {CategorySchema} from "../utils/schemas/category.schema";
import {InternalServerError,AppError,NotFoundError} from "../utils/errors";
import {userRepository} from "../repositories/user.repository";

class CategoryService {
    async createCategory(userId: string, data: CategorySchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if(!user) {
                throw new NotFoundError("User");
            }
            return await categoryRepository.createCategory(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error creating category:", error);
            throw new InternalServerError("Failed to create category");
        }
    }

    async getCategoryByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if(!user) {
                throw new NotFoundError("User");
            }
            const category = await categoryRepository.getCategoryByUserId(user.id)
            if (!category) {
                throw new NotFoundError("Category");
            }
            return category;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching category:", error);
            throw new InternalServerError("Failed to fetch category");
        }
    }

    async updateCategory(userId: string, data: CategorySchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if(!user) {
                throw new NotFoundError("User");
            }
            return await categoryRepository.updateCategory(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error updating category:", error);
            throw new InternalServerError("Failed to update category");
        }
    }
}

export const categoryService = new CategoryService();