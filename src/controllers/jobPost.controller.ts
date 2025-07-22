import {jobPostService} from '../services/jobPost.service';
import {Request, Response,NextFunction} from 'express';
import {getUserFromAccessToken} from '../validators/auth.validator';

class JobPostController {

    async createJobPost(req: Request, res: Response, next: NextFunction) {
      
        try {
            const { userId } = getUserFromAccessToken(req);
            const result = await jobPostService.createJobPost(userId, req.body);
            res.status(201).json({
                message: "Job post created successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async getJobPostByUserId(req: Request, res: Response, next: NextFunction) {
        
        try {
            const { userId } = getUserFromAccessToken(req);
            const result = await jobPostService.getJobPostByUserId(userId);
            res.status(200).json({
                message: "Job posts fetched successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateJobPost(req: Request, res: Response, next: NextFunction) {
       
        try {
            const { userId } = getUserFromAccessToken(req);
            const result = await jobPostService.updateJobPost(userId, req.body);
            res.status(200).json({
                message: "Job post updated successfully",
                status: "success",
                isOperational: true,
                data: result,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const jobPostController = new JobPostController();