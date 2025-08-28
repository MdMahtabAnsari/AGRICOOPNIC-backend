import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { AddressSchema } from "../utils/schemas/address.schema";

class AddressRepository {
    async createAddress(userId: string, data: AddressSchema) {
        try {
            return await prisma.address.create({
                data: {
                    userId: userId,
                    ...data,
                }
            });
        } catch (error) {
            console.error("Error creating address:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Address already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                } else if (error.code === 'P2025') {
                    throw new NotFoundError("User not found");
                }
            }
            throw new InternalServerError("Failed to create address");
        }
    }

    async getAddressByUserId(userId: string) {
        try {
            return await prisma.address.findMany({
                where: { userId: userId }
            });
        } catch (error) {
            console.error("Error fetching address:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Address not found");
                }
            }
            throw new InternalServerError("Failed to fetch address");
        }
    }

    async updateAddress(userId: string, data: AddressSchema) {
        try {
            return await prisma.address.update({
                where: { userId_addressType: { userId: userId, addressType: data.addressType } },
                data: data
            });
        } catch (error) {
            console.error("Error updating address:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Address already exists");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Failed to update address");
        }
    }
}

export const addressRepository = new AddressRepository();