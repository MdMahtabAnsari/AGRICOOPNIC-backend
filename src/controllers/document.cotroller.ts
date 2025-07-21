import { documentService } from "../services/document.service";
import { Request,Response,NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { UnauthorisedError } from "../utils/errors";

class DocumentController {
    async createDocument(req: Request, res: Response, next: NextFunction) {
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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
        const { userId } = getAuth(req);
        if (!userId) {
            return next(new UnauthorisedError("User not authenticated"));
        }
        try {
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