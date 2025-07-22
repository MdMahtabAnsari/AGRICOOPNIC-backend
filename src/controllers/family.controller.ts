import {familyService} from "../services/family.service";
import {Request, Response,NextFunction} from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";

export class FamilyController {
    async createFamily(req: Request, res: Response, next: NextFunction) {
        
        
        try {
            const {userId} = getUserFromAccessToken(req);
            const family = await familyService.createFamily(userId, req.body);
            res.status(201).json({
                message: "Family created successfully",
                status: "success",
                isOperational: true,
                data: family,
                statusCode: 201,

            });
        } catch (error) {
            next(error);
        }
    }

    async getFamilyByUserId(req: Request, res: Response, next: NextFunction) {
        
        try {
            const {userId} = getUserFromAccessToken(req);
            const family = await familyService.getFamilyByUserId(userId);
            res.status(200).json({
                message: "Family fetched successfully",
                status: "success",
                isOperational: true,
                data: family,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateFamily(req: Request, res: Response, next: NextFunction) {
        
        try {
            const {userId} = getUserFromAccessToken(req);
            const family = await familyService.updateFamily(userId, req.body);
            res.status(200).json({
                message: "Family updated successfully",
                status: "success",
                isOperational: true,
                data: family,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const familyController = new FamilyController();