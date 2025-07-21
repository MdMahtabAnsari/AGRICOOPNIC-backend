import { educationRepository } from "../repositories/education.repository";
import { EducationSchema } from "../utils/schemas/education.schema";
import {InternalServerError,AppError,NotFoundError} from "../utils/errors";
import {userRepository} from "../repositories/user.repository";

class EducationService {
    async createEducation(userId: string, data: EducationSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            return await educationRepository.createEducation(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error creating education:", error);
            throw new InternalServerError("Failed to create education");
        }
    }

    async getEducationByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            const education = await educationRepository.getEducationByUserId(user.id);
            if (education.length === 0) {
                throw new NotFoundError("Education not found");
            }
            return education;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching education:", error);
            throw new InternalServerError("Failed to fetch education");
        }
    }

    async updateEducation(userId: string, data: EducationSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            return await educationRepository.updateEducation(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error updating education:", error);
            throw new InternalServerError("Failed to update education");
        }
    }
}

export const educationService = new EducationService();

