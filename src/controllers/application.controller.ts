import { applicationService } from '../services/application.service';
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";

class ApplicationController {
    async getApplicationByUserId(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const application = await applicationService.getApplicationByUserId(userId);
            res.status(200).json({
                message: "Application retrieved successfully",
                status: "success",
                isOperational: true,
                data: application,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const applicationController = new ApplicationController();
