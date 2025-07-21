import { paymentService } from "../services/payment.service";
import {Request, Response,NextFunction} from "express";
import {getAuth} from "@clerk/express";
import {UnauthorisedError} from "../utils/errors";

class PaymentController {

    async createPayment(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const paymentData = req.body;
        try {
            const result = await paymentService.createPayment(userId, paymentData);
            res.status(201).json({
                message: "Payment created successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyPayment(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
    
        try {
            const result = await paymentService.verifyPayment(req.body);
            res.status(200).json({
                message: "Payment verified successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserSuccessfulPayments(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
            const payments = await paymentService.getUserSuccessfulPayments(userId);
            res.status(200).json({
                message: "User successful payments fetched successfully",
                status: "success",
                isOperational: true,
                data: payments,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}


export const paymentController = new PaymentController();