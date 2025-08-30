import { Router } from 'express';
import { categorySchema } from '../utils/schemas/category.schema';
import { queryValidator } from "../validators";

import { feesController } from '../controllers/fees.controller';

const feesRouter: Router = Router();

feesRouter.get('/', queryValidator(categorySchema), feesController.getFeesByCategory);

export default feesRouter;