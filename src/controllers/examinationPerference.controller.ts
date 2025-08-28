import { examinationPreferenceService } from "../services/examinationPreference.service";
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";


class ExaminationPreferenceController {
    async createExaminationPreference(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const data = req.body;
            const preference = await examinationPreferenceService.createExaminationPreference(userId, data);
            res.status(201).json({
                message: "Examination preference created successfully",
                status: "success",
                isOperational: true,
                data: preference,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async getExaminationPreference(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const preferences = await examinationPreferenceService.getExaminationPreferenceByUserId(userId);
            res.status(200).json({
                message: "Examination preferences fetched successfully",
                status: "success",
                isOperational: true,
                data: preferences,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateExaminationPreference(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const data = req.body;
            const updatedPreference = await examinationPreferenceService.updateExaminationPreference(userId, data);
            res.status(200).json({
                message: "Examination preference updated successfully",
                status: "success",
                isOperational: true,
                data: updatedPreference,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const examinationPreferenceController = new ExaminationPreferenceController();