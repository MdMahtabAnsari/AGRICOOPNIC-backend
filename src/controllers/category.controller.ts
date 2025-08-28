import { categoryService } from "../services/category.service";
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";


class CategoryController {
    async createCategory(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const category = await categoryService.createCategory(userId, req.body);
            return res.status(201).json({
                message: "Category created successfully",
                status: "success",
                isOperational: true,
                data: category,
                statusCode: 201,
            });
        } catch (error) {
            return next(error);
        }
    }

    async getCategoryByUserId(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const category = await categoryService.getCategoryByUserId(userId);
            return res.status(200).json({
                message: "Category fetched successfully",
                status: "success",
                isOperational: true,
                data: category,
                statusCode: 200,
            });
        } catch (error) {
            return next(error);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {


        try {
            const { userId } = getUserFromAccessToken(req);
            const updatedCategory = await categoryService.updateCategory(userId, req.body);
            return res.status(200).json({
                message: "Category updated successfully",
                status: "success",
                isOperational: true,
                data: updatedCategory,
                statusCode: 200,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const categoryController = new CategoryController();