import { userController } from "../controllers/user.controller";
import { Router } from "express";
import { bodyValidator,queryValidator } from "../validators";
import { userSchema } from "../utils/schemas/user.schema";
import {emailObject,phoneObject,aadhaarObject} from "../utils/schemas/common.schema";

const userRouter: Router = Router();

userRouter.post("/create", bodyValidator(userSchema), userController.createUser);
userRouter.put("/update", bodyValidator(userSchema), userController.updateUser);
userRouter.get("/", userController.getUser);
userRouter.get("/is-email-exists", queryValidator(emailObject), userController.isEmailExists);
userRouter.get("/is-phone-exists", queryValidator(phoneObject), userController.isPhoneExists);
userRouter.get("/is-aadhaar-exists", queryValidator(aadhaarObject), userController.isAadhaarExists);
userRouter.delete("/delete", userController.deleteUser);

export default userRouter;
