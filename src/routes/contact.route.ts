import { contactController } from "../controllers/contact.controller";
import { Router } from "express";
import {bodyValidator} from "../validators";
import { contactSchema } from "../utils/schemas/contact";

const contactRouter:Router = Router();

contactRouter.post("/submit", bodyValidator(contactSchema), contactController.submitContactForm);

export default contactRouter;