import { addressService } from "../services/address.service";
import { Request, Response,NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { UnauthorisedError } from "../utils/errors";

class AddressController {
    async createAddress(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
            const address = await addressService.createAddress(userId, req.body);
            res.status(201).json({
                message: "Address created successfully",
                status: "success",
                isOperational: true,
                data: address,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAddressByUserId(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
            const address = await addressService.getAddressByUserId(userId);
            res.status(200).json({
                message: "Address fetched successfully",
                status: "success",
                isOperational: true,
                data: address,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateAddress(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
            const updatedAddress = await addressService.updateAddress(userId, req.body);
            res.status(200).json({
                message: "Address updated successfully",
                status: "success",
                isOperational: true,
                data: updatedAddress,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const addressController = new AddressController();