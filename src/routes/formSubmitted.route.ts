import { formSubmittedController } from "../controllers/formSubmitted.controller";
import { Router } from "express";

const formSubmittedRouter: Router = Router();

formSubmittedRouter.post(
    "/",
    formSubmittedController.makeFormSubmitted
);

formSubmittedRouter.get(
    "/",
    formSubmittedController.getFormSubmittedByUserId
);

export default formSubmittedRouter;
