import { paymentController } from "../controllers/payment.controller";
import { routePaymentSchema,verifyPaymentSchema } from "../utils/schemas/payment.schema";
import { bodyValidator } from "../validators";
import { Router } from "express";

const paymentRouter: Router = Router();

paymentRouter.post(
    "/create",
    bodyValidator(routePaymentSchema),
    paymentController.createPayment
);

paymentRouter.post(
    "/verify",
    bodyValidator(verifyPaymentSchema),
    paymentController.verifyPayment
);

paymentRouter.get(
    "/user-successful-payments",
    paymentController.getUserSuccessfulPayments
);

export default paymentRouter;
