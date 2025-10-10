import {applicationController} from "../controllers/application.controller";
import { Router } from "express";

const applicationRouter:Router = Router();

applicationRouter.get("/me", applicationController.getApplicationByUserId);

export default applicationRouter;
