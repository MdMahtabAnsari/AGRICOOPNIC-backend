import { examinationPreferenceController } from "../controllers/examinationPerference.controller";
import { Router } from "express";
import { bodyValidator } from "../validators";
import { examinationPreferenceSchema } from "../utils/schemas/examinationPreference.schema";

const examinationPreferenceRouter: Router = Router();


examinationPreferenceRouter.post( "/create",bodyValidator(examinationPreferenceSchema),examinationPreferenceController.createExaminationPreference);
examinationPreferenceRouter.get("/",examinationPreferenceController.getExaminationPreference);
examinationPreferenceRouter.put("/update",bodyValidator(examinationPreferenceSchema), examinationPreferenceController.updateExaminationPreference);


export default examinationPreferenceRouter;