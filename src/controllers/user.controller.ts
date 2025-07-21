import { userService } from "../services/user.service";
import { Request, Response,NextFunction } from "express";
import {getAuth} from '@clerk/express';
import { UnauthorisedError } from "../utils/errors";
import { AadhaarObject,EmailObject,PhoneObject } from "../utils/schemas/common.schema";

class UserController {
    async getUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try{
            const user = await userService.getUserById(userId);
            res.status(200).json({
                message: "User fetched successfully",
                status: "success",
                isOperational: true,
                data: user,
                statusCode: 200,
            });
        } catch (error) {
            console.error("Error fetching user:", error);
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
            const user = await userService.createUser(userId, req.body);
            res.status(201).json({
                message: "User created successfully",
                status: "success",
                isOperational: true,
                data: user,
                statusCode: 201,
            });
        } catch (error) {
            console.error("Error creating user:", error);
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
            const user = await userService.updateUser(userId, req.body);
            res.status(200).json({
                message: "User updated successfully",
                status: "success",
                isOperational: true,
                data: user,
            });
        } catch (error) {
            console.error("Error updating user:", error);
            next(error);
        }
    }

    async isEmailExists(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const { email } = req.query as EmailObject;
        try {
            const exists = await userService.isEmailExists(email);
            res.status(200).json({
                message: "Email existence checked successfully",
                status: "success",
                isOperational: true,
                data: exists,
                statusCode: 200,
            });
        } catch (error) {
            console.error("Error checking email existence:", error);
            next(error);
        }
    }
    async isPhoneExists(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const { phone } = req.query as PhoneObject;
        try {
            const exists = await userService.isPhoneExists(phone);
            res.status(200).json({
                message: "Phone existence checked successfully",
                status: "success",
                isOperational: true,
                data: exists,
                statusCode: 200,
            });
        } catch (error) {
            console.error("Error checking phone existence:", error);
            next(error);
        }
    }
    async isAadhaarExists(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        const { aadhaar } = req.query as AadhaarObject;
        try {
            const exists = await userService.isAadhaarExists(aadhaar);
            res.status(200).json({
                message: "Aadhaar existence checked successfully",
                status: "success",
                isOperational: true,
                data: exists,
                statusCode: 200,
            });
        } catch (error) {
            console.error("Error checking Aadhaar existence:", error);
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
            await userService.deleteUser(userId);
            res.status(200).json({
                message: "User deleted successfully",
                status: "success",
                isOperational: true,
                statusCode: 200,
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            next(error);
        }
    }
}

export const userController = new UserController();