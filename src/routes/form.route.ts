import { formController } from "../controllers/form.controller";
import { Router } from "express";

const formRouter: Router = Router();

formRouter.get("/submitted-forms", formController.getAllSubmittedFormsDetails);
formRouter.get("/export-excel", formController.exportFormsToExcel);

export default formRouter;