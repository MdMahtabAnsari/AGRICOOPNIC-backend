import { examinationPreferenceRepository } from "../repositories/examinationPreference.repository";
import { ExaminationPreferenceSchema } from "../utils/schemas/examinationPreference.schema";
import {InternalServerError,AppError,NotFoundError} from "../utils/errors";
import {userRepository} from "../repositories/user.repository";

class ExaminationPreferenceService {
    async createExaminationPreference(userId: string, data: ExaminationPreferenceSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await examinationPreferenceRepository.createExaminationPreference(user.id, data);
        } catch (error) {
            if( error instanceof AppError) {
                throw error;
            }
            console.error("Error creating examination preference:", error);
            throw new InternalServerError("Failed to create examination preference");
        }
    }

    async getExaminationPreferenceByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            const preferences = await examinationPreferenceRepository.getExaminationPreferenceByUserId(userId);
            if( preferences.length === 0) {
                throw new NotFoundError("Examination preference not found");
            }
            return preferences;
        } catch (error) {
            if( error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching examination preference:", error);
            throw new InternalServerError("Failed to fetch examination preference");
        }
    }

    async updateExaminationPreference(userId: string, data: ExaminationPreferenceSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await examinationPreferenceRepository.updateExaminationPreference(userId, data);
        } catch (error) {
            if( error instanceof AppError) {
                throw error;
            }
            console.error("Error updating examination preference:", error);
            throw new InternalServerError("Failed to update examination preference");
        }
    }
}

export const examinationPreferenceService = new ExaminationPreferenceService();
