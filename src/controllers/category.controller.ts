import {categoryService} from "../services/category.service";
import {Request, Response,NextFunction} from "express";
import {getAuth} from "@clerk/express";
import {UnauthorisedError} from "../utils/errors";

class CategoryController {
    async createCategory(req: Request, res: Response, next: NextFunction) {

        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const data = req.body;
        try {
            const category = await categoryService.createCategory(userId, data);
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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

        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const data = req.body;
        try {
            const updatedCategory = await categoryService.updateCategory(userId, data);
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