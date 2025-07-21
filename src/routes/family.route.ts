import {familyController} from "../controllers/family.controller";
import {Router} from "express";
import {familySchema} from "../utils/schemas/family.schema";
import {bodyValidator} from "../validators";

const familyRouter: Router = Router();

familyRouter.post("/create", bodyValidator(familySchema), familyController.createFamily);
familyRouter.get("/", familyController.getFamilyByUserId);
familyRouter.put("/update", bodyValidator(familySchema), familyController.updateFamily);

export default familyRouter;