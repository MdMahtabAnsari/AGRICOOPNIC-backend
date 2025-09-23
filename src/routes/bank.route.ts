import { bankController } from "../controllers/bank.controller";
import { Router } from "express";

const bankRouter: Router = Router();

bankRouter.get("/details", bankController.getBankDetails);

export default bankRouter;