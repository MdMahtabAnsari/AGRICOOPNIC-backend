import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import {JobPostSchema} from "../utils/schemas/jobPost.schema";

class JobPostRepository {
    async createJobPost(userId:string,applicationNo:string,data: JobPostSchema) {
        try {
            return await prisma.jobPost.create({
                data:{
                    userId: userId,
                    applicationNo: applicationNo,
                    ...data
                }
            });
        } catch (error) {
            console.error("Error creating job post:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Job post");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
                else if( error.code === 'P2025') {
                    throw new NotFoundError("User");
                }
            }
            throw new InternalServerError("Failed to create job post");
        }
    }

    async getJobPostByUserId(userId: string) {
        try {
            return await prisma.jobPost.findFirst({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching job post:", error);
            throw new InternalServerError("Failed to fetch job post");
        }
    }

    async updateJobPost(userId: string, data: JobPostSchema) {
        try {
            return await prisma.jobPost.update({
                where: { userId: userId },
                data: data
            });
        } catch (error) {
            console.error("Error updating job post:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Job post");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
                else if( error.code === 'P2025') {
                    throw new NotFoundError("Job post/User");
                }

            }
            throw new InternalServerError("Failed to update job post");
        }
    }
}

export const jobPostRepository = new JobPostRepository();