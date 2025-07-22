import { Request,Response,NextFunction } from "express";
import { educationService } from "../services/education.service";
import { getUserFromAccessToken } from "../validators/auth.validator";

class EducationController {
    async createEducation(req: Request, res: Response, next: NextFunction) {
        
        try {
            const { userId } = getUserFromAccessToken(req);
            const data = req.body;
            const education = await educationService.createEducation(userId, data);
            res.status(201).json({
                message: "Education created successfully",
                status: "success",
                isOperational: true,
                data: education,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async getEducationByUserId(req: Request, res: Response, next: NextFunction) {
        
        try {
            const { userId } = getUserFromAccessToken(req);
            const education = await educationService.getEducationByUserId(userId);
            res.status(200).json({
                message: "Education fetched successfully",
                status: "success",
                isOperational: true,
                data: education,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateEducation(req: Request, res: Response, next: NextFunction) {
       
        try {
            const { userId } = getUserFromAccessToken(req);
            const data = req.body;
            const updatedEducation = await educationService.updateEducation(userId, data);
            res.status(200).json({
                message: "Education updated successfully",
                status: "success",
                isOperational: true,
                data: updatedEducation,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const educationController = new EducationController();

