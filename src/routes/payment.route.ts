import { paymentController } from "../controllers/payment.controller";
import { routePaymentSchema,verifyPaymentSchema,orderIdObject } from "../utils/schemas/payment.schema";
import { bodyValidator,queryValidator } from "../validators";
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

paymentRouter.post(
    "/create-phonepe",
    bodyValidator(routePaymentSchema),
    paymentController.createPhonepePayment
);

paymentRouter.get(
    "/verify-phonepe",
    queryValidator(orderIdObject),
    paymentController.verifyPhonepePayment
);

export default paymentRouter;
