import { educationController } from "../controllers/education.controller";
import { Router } from "express";
import { bodyValidator } from "../validators";
import { educationSchema } from "../utils/schemas/education.schema";

const educationRouter: Router = Router();

educationRouter.post("/create", bodyValidator(educationSchema), educationController.createEducation);
educationRouter.get("/", educationController.getEducationByUserId);
educationRouter.put("/update", bodyValidator(educationSchema), educationController.updateEducation);


export default educationRouter;