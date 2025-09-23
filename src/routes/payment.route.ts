import { paymentController } from "../controllers/payment.controller";
import { routePaymentSchema,verifyPaymentSchema,orderIdObject,customPaymentSchema,customVerifyPaymentSchema,bankPaymentSchema } from "../utils/schemas/payment.schema";
import { bodyValidator,queryValidator } from "../validators";
import { Router } from "express";

const paymentRouter: Router = Router();

paymentRouter.post(
    "/create-razorpay",
    bodyValidator(routePaymentSchema),
    paymentController.createRazorpayPayment
);

paymentRouter.post(
    "/verify-razorpay",
    bodyValidator(verifyPaymentSchema),
    paymentController.verifyRazorpayPayment
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

paymentRouter.post(
    "/create-payu",
    bodyValidator(routePaymentSchema),
    paymentController.createPayUPayment
);

paymentRouter.post(
    "/verify-payu",
    queryValidator(orderIdObject),
    paymentController.verifyPayUPayment
);

paymentRouter.post(
    "/create-custom-payment",
    bodyValidator(customPaymentSchema),
    paymentController.createCustomPayment
);
paymentRouter.post(
    "/verify-custom-payment",
    bodyValidator(customVerifyPaymentSchema),
    paymentController.verifyCustomPayment
);

paymentRouter.post(
    "/bank-payment",
    bodyValidator(bankPaymentSchema),
    paymentController.bankPayment
);

export default paymentRouter;
