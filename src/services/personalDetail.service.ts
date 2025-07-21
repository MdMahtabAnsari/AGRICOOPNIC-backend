import {personalDetailRepository} from "../repositories/personalDetail.repository";
import {PersonalDetailSchema} from "../utils/schemas/personalDetail.schema";
import {InternalServerError,AppError,NotFoundError} from "../utils/errors";
import {userRepository} from "../repositories/user.repository";

class PersonalDetailService {
    async createPersonalDetail(userId: string, data: PersonalDetailSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await personalDetailRepository.createPersonalDetail(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error creating personal detail:", error);
            throw new InternalServerError("Failed to create personal detail");
        }
    }

    async getPersonalDetailByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            const detail = await personalDetailRepository.getPersonalDetailByUserId(user.id);
            if (!detail) {
                throw new NotFoundError("Personal detail");
            }
            return detail;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching personal detail:", error);
            throw new InternalServerError("Failed to fetch personal detail");
        }
    }

    async updatePersonalDetail(userId: string, data: PersonalDetailSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await personalDetailRepository.updatePersonalDetail(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error updating personal detail:", error);
            throw new InternalServerError("Failed to update personal detail");
        }
    }
}

export const personalDetailService = new PersonalDetailService();