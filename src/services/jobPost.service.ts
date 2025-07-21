import {jobPostRepository} from "../repositories/jobPost.repository";
import {JobPostSchema} from "../utils/schemas/jobPost.schema";
import {InternalServerError,AppError,NotFoundError,ConflictError} from "../utils/errors";
import {applicationNoGenerator} from "../utils/helpers/applicationNoGenerator";
import {userRepository} from "../repositories/user.repository";

class JobPostService {
    async createJobPost(userId: string, data: JobPostSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if(!user) {
                throw new NotFoundError("User");
            }
            const isJobPostExists = await jobPostRepository.getJobPostByUserId(user.id);
            if (isJobPostExists) {
                throw new ConflictError("Job post");
            }
            const applicationNo = await applicationNoGenerator();
            return await jobPostRepository.createJobPost(user.id, applicationNo, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error creating job post:", error);
            throw new InternalServerError("Failed to create job post");
        }
    }

    async getJobPostByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if(!user) {
                throw new NotFoundError("User");
            }
            const job = await jobPostRepository.getJobPostByUserId(user.id);
            if (!job) {
                throw new NotFoundError("Job post");
            }
            return job;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching job post:", error);
            throw new InternalServerError("Failed to fetch job post");
        }
    }

    async updateJobPost(userId: string, data: JobPostSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if(!user) {
                throw new NotFoundError("User");
            }
            return await jobPostRepository.updateJobPost(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error updating job post:", error);
            throw new InternalServerError("Failed to update job post");
        }
    }
}

export const jobPostService = new JobPostService();