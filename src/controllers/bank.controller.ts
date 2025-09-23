import { bankService } from "../services/bank.service";
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";


class BankController {
    async getBankDetails(req: Request, res: Response, next: NextFunction) {

        try {
            getUserFromAccessToken(req);
            const bankDetails = await bankService.getBankDetails();
            return res.status(200).json({
                message: "Bank details retrieved successfully",
                status: "success",
                isOperational: true,
                data: bankDetails,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const bankController = new BankController();
