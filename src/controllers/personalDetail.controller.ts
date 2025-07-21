import {personalDetailService} from "../services/personalDetail.service";
import {Request, Response,NextFunction} from "express";
import {getAuth} from "@clerk/express";
import {UnauthorisedError} from "../utils/errors";

class  PersonalDetailController {
    async createPersonalDetail(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            throw new UnauthorisedError("User not authenticated");
        }
        const data = req.body;
        try {
            const personalDetail = await personalDetailService.createPersonalDetail(userId, data);
            res.status(201).json({
                message: "Personal detail created successfully",
                status: "success",
                isOperational: true,
                data: personalDetail,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async getPersonalDetailByUserId(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            throw new UnauthorisedError("User not authenticated");
        }
        try {

            const personalDetail = await personalDetailService.getPersonalDetailByUserId(userId);
            res.status(200).json({
                message: "Personal detail fetched successfully",
                status: "success",
                isOperational: true,
                data: personalDetail,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async updatePersonalDetail(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            throw new UnauthorisedError("User not authenticated");
        }
        const data = req.body;
        try {

            const updatedPersonalDetail = await personalDetailService.updatePersonalDetail(userId, data);
            res.status(200).json({
                message: "Personal detail updated successfully",
                status: "success",
                isOperational: true,
                data: updatedPersonalDetail,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const personalDetailController = new PersonalDetailController();