import { userRepository } from "../repositories/user.repository";
import { AppError, InternalServerError, NotFoundError } from "../utils/errors";
import { UserSchema } from "../utils/schemas/user.schema";

class UserService {
    async createUser(userId: string, data: UserSchema) {
        try {
            return await userRepository.createUser(userId, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to create user");
        }
    }

    async updateUser(userId: string, data: UserSchema) {
        try {
            return await userRepository.updateUser(userId, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to update user");
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return user;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to fetch user");
        }
    }

    async isEmailExists(email: string) {
        try {
            return await userRepository.isEmailExists(email);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to check email existence");
        }
    }

    async isPhoneExists(phone: string) {
        try {
            return await userRepository.isPhoneExists(phone);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to check phone existence");
        }
    }

    async isAadhaarExists(aadhaar: string) {
        try {
            return await userRepository.isAadhaarExists(aadhaar);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to check Aadhaar existence");
        }
    }

    async deleteUser(userId: string) {
        try {
            return await userRepository.deleteUser(userId);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to delete user");
        }
    }
}

export const userService = new UserService();