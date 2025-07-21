import {familyRepository} from "../repositories/family.repository";
import {FamilySchema} from "../utils/schemas/family.schema";
import {InternalServerError,AppError,NotFoundError} from "../utils/errors";
import {userRepository} from "../repositories/user.repository";

class FamilyService {
    async createFamily(userId: string, data: FamilySchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await familyRepository.createFamily(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error creating family:", error);
            throw new InternalServerError("Failed to create family");
        }
    }

    async getFamilyByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            const family = await familyRepository.getFamilyByUserId(user.id);
            if (!family) {
                throw new NotFoundError("Family");
            }
            return family;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching family:", error);
            throw new InternalServerError("Failed to fetch family");
        }
    }

    async updateFamily(userId: string, data: FamilySchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await familyRepository.updateFamily(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error updating family:", error);
            throw new InternalServerError("Failed to update family");
        }
    }
}

export const familyService = new FamilyService();