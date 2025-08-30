import {authController} from '../controllers/auth.controller';
import {bodyValidator,queryValidator} from '../validators';
import {signInSchema,signUpSchema,userIdEmailObjectWithOptional,passwordSchema} from '../utils/schemas/auth.schema';
import {emailObject} from "../utils/schemas/common.schema";
import {otpSchema} from "../utils/schemas/otp.schema";


import {Router} from 'express';

const authRouter: Router = Router();

authRouter.post('/signup', bodyValidator(signUpSchema), authController.signUp);
authRouter.post('/signin', bodyValidator(signInSchema), authController.signIn);
authRouter.post('/refresh', authController.refresh);
authRouter.get('/is-logged-in', authController.isLoggedIn);
authRouter.delete('/logout', authController.logout);
authRouter.get('/is-available', queryValidator(userIdEmailObjectWithOptional), authController.isUserExists);
authRouter.put('/reset-password', bodyValidator(passwordSchema), authController.resetPassword);
authRouter.post('/otp/create',bodyValidator(emailObject),authController.sendOtpEmail);
authRouter.post('/otp/verify',bodyValidator(otpSchema),authController.verifyOtp);

export default authRouter;