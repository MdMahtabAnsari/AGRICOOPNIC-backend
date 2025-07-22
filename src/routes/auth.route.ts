import {authController} from '../controllers/auth.controller';
import {bodyValidator,queryValidator} from '../validators';
import {authSchema} from '../utils/schemas/auth.schema';
import { userIdObj } from '../utils/schemas/auth.schema';

import {Router} from 'express';

const authRouter: Router = Router();

authRouter.post('/signup', bodyValidator(authSchema), authController.signUp);
authRouter.post('/signin', bodyValidator(authSchema), authController.signIn);
authRouter.post('/refresh', authController.refresh);
authRouter.get('/is-logged-in', authController.isLoggedIn);
authRouter.delete('/logout', authController.logout);
authRouter.get('/is-user-exists', queryValidator(userIdObj), authController.isUserExists);

export default authRouter;