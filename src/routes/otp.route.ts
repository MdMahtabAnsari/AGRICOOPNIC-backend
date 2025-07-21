import {Router} from "express";
import {otpController} from "../controllers/otp.controller";
import {emailObject} from "../utils/schemas/common.schema";
import {otpSchema} from "../utils/schemas/otp.schema";
import {bodyValidator} from "../validators";

const otpRouter:Router = Router();

otpRouter.post('/create',bodyValidator(emailObject),otpController.sendOtpEmail);
otpRouter.post('/verify',bodyValidator(otpSchema),otpController.verifyOtp);

export default otpRouter;