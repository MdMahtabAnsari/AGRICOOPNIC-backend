import {jobPostService} from '../services/jobPost.service';
import {Request, Response,NextFunction} from 'express';
import {getAuth} from "@clerk/express";
import {UnauthorisedError} from "../utils/errors";

class JobPostController {

    async createJobPost(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const data = req.body;
        try {

            const result = await jobPostService.createJobPost(userId, data);
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const data = req.body;
        try {

            const result = await jobPostService.updateJobPost(userId, data);
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