import {personalDetailController} from "../controllers/personalDetail.controller";
import {bodyValidator} from "../validators";
import {personalDetailSchema} from "../utils/schemas/personalDetail.schema";
import {Router} from "express";

const personalDetailRouter:Router = Router();

personalDetailRouter.post("/create", bodyValidator(personalDetailSchema), personalDetailController.createPersonalDetail);
personalDetailRouter.get("/", personalDetailController.getPersonalDetailByUserId);
personalDetailRouter.put("/update", bodyValidator(personalDetailSchema), personalDetailController.updatePersonalDetail);

export default personalDetailRouter;