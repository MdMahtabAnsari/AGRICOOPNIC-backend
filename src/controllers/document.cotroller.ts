import { documentService } from "../services/document.service";
import { Request, Response, NextFunction } from "express";
import { getUserFromAccessToken } from "../validators/auth.validator";

class DocumentController {
    async createDocument(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const document = await documentService.createDocument(userId, req.body);
            res.status(201).json({
                message: "Document created successfully",
                status: "success",
                isOperational: true,
                data: document,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }

    async getDocumentByUserId(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const documents = await documentService.getDocumentByUserId(userId);
            res.status(200).json({
                message: "Documents fetched successfully",
                status: "success",
                isOperational: true,
                data: documents,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateDocument(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = getUserFromAccessToken(req);
            const updatedDocument = await documentService.updateDocument(userId, req.body);
            res.status(200).json({
                message: "Document updated successfully",
                status: "success",
                isOperational: true,
                data: updatedDocument,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const documentController = new DocumentController();