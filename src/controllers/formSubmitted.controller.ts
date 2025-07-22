import { formSubmittedService } from "../services/formSubmitted.service";

import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";


class FormSubmittedController {
    async makeFormSubmitted(req: Request, res: Response, next: NextFunction) {
        
        try {
            const { userId } = getUserFromAccessToken(req);
            const result = await formSubmittedService.makeFormSubmitted(userId);
            return res.status(201).json({
                message: "Form submitted successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 201,
            });
        } catch (error) {
            return next(error);
        }
    }

    async getFormSubmittedByUserId(req: Request, res: Response, next: NextFunction) {
       
        try {
            const { userId } = getUserFromAccessToken(req);
            const formSubmitted = await formSubmittedService.getFormSubmittedByUserId(userId);
            return res.status(200).json({
                message: "Form submitted fetched successfully",
                status: "success",
                isOperational: true,
                data: formSubmitted,
                statusCode: 200,
            });
        } catch (error) {
            return next(error);
        }
    }
}

export const formSubmittedController = new FormSubmittedController();