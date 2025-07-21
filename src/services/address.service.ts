import { addressRepository } from "../repositories/address.repository";
import { AddressSchema } from "../utils/schemas/address.schema";
import {InternalServerError,AppError,NotFoundError} from "../utils/errors";
import {userRepository} from "../repositories/user.repository";

class AddressService {
    async createAddress(userId: string, data: AddressSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            return await addressRepository.createAddress(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error creating address:", error);
            throw new InternalServerError("Failed to create address");
        }
    }

    async getAddressByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            const address = await addressRepository.getAddressByUserId(user.id);
            if (address.length === 0) {
                throw new NotFoundError("Address not found");
            }
            return address;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching address:", error);
            throw new InternalServerError("Failed to fetch address");
        }
    }

    async updateAddress(userId: string, data: AddressSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User not found");
            }
            return await addressRepository.updateAddress(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error updating address:", error);
            throw new InternalServerError("Failed to update address");
        }
    }
}

export const addressService = new AddressService();