import { paymentService } from "../services/payment.service";
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";
import { OrderIdObject } from "../utils/schemas/payment.schema";


class PaymentController {

    async createPayment(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = getUserFromAccessToken(req);
            const result = await paymentService.createPayment(userId, req.body);
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
        try {
            getUserFromAccessToken(req);
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
        try {
            const { userId } = getUserFromAccessToken(req);
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

    async createPhonepePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = getUserFromAccessToken(req);
            const result = await paymentService.createPhonepePayment(userId, req.body);
            res.status(201).json({
                message: "PhonePe payment created successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyPhonepePayment(req: Request, res: Response, next: NextFunction) {
        try {
            const { orderId } = req.query as OrderIdObject;
           await paymentService.verifyPhonepePayment(orderId);
           res.redirect("http://localhost:5173/application");
        } catch (error) {
            next(error);
        }
    }
}


export const paymentController = new PaymentController();