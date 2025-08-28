import { userService } from "../services/user.service";
import { Request, Response, NextFunction } from "express";
import { AadhaarObject, EmailObject, PhoneObject } from "../utils/schemas/common.schema";
import { getUserFromAccessToken } from "../validators/auth.validator";

class UserController {
    async getUser(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
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

        try {
            const { userId } = getUserFromAccessToken(req);
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

        try {
            const { userId } = getUserFromAccessToken(req);
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

        try {
            getUserFromAccessToken(req);
            const { email } = req.query as EmailObject;
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

        try {
            getUserFromAccessToken(req);
            const { phone } = req.query as PhoneObject;
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

        try {
            getUserFromAccessToken(req);
            const { aadhaar } = req.query as AadhaarObject;
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

        try {
            const { userId } = getUserFromAccessToken(req);
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