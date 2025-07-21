import { getAuth } from "@clerk/express";
import { Request,Response,NextFunction } from "express";
import { UnauthorisedError } from "../utils/errors";
import { educationService } from "../services/education.service";

class EducationController {
    async createEducation(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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

