import { formSubmittedService } from "../services/formSubmitted.service";
import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { UnauthorisedError } from "../utils/errors";

class FormSubmittedController {
    async makeFormSubmitted(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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