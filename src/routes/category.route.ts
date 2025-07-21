import {categoryController} from "../controllers/category.controller";
import { Router } from "express";
import {bodyValidator} from "../validators";
import {categorySchema} from "../utils/schemas/category.schema";

const categoryRouter:Router = Router();

categoryRouter.post("/create", bodyValidator(categorySchema), categoryController.createCategory);
categoryRouter.get("/", categoryController.getCategoryByUserId);
categoryRouter.put("/update", bodyValidator(categorySchema), categoryController.updateCategory);

export default categoryRouter;