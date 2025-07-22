import { addressService } from "../services/address.service";
import { Request, Response,NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";

class AddressController {
    async createAddress(req: Request, res: Response, next: NextFunction) {
        
        try {
            const { userId } = getUserFromAccessToken(req);
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
        
        try {
            const { userId } = getUserFromAccessToken(req);
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
        
        try {
            const { userId } = getUserFromAccessToken(req);
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