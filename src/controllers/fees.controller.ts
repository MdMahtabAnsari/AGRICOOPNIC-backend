import { feesService } from "../services/fees.service";
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";
import { CategorySchema } from "../utils/schemas/category.schema";

class FeesController {
    async getFeesByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            getUserFromAccessToken(req);
            const { categoryType } = req.query as CategorySchema;
            const fees = await feesService.getFeesByCategory(categoryType);
            return res.status(200).json({
                message: "Fees fetched successfully",
                status: "success",
                isOperational: true,
                data: fees,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const feesController = new FeesController();
