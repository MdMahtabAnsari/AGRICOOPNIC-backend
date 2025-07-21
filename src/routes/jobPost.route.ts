import {jobPostController} from '../controllers/jobPost.controller';
import { Router } from 'express';
import {jobPostSchema} from "../utils/schemas/jobPost.schema";
import {bodyValidator} from "../validators";

const jobPostRouter: Router = Router();

jobPostRouter.post('/create', bodyValidator(jobPostSchema), jobPostController.createJobPost);
jobPostRouter.get('/', jobPostController.getJobPostByUserId);
jobPostRouter.put('/update', bodyValidator(jobPostSchema), jobPostController.updateJobPost);

export default jobPostRouter;