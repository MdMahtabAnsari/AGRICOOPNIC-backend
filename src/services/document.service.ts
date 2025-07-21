import { documentRepository } from "../repositories/document.repository";
import { DocumentSchema } from "../utils/schemas/document.schema";
import {InternalServerError,AppError,NotFoundError} from "../utils/errors";
import {userRepository} from "../repositories/user.repository";

class DocumentService {
    async createDocument(userId: string, data: DocumentSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await documentRepository.createDocument(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error creating document:", error);
            throw new InternalServerError("Failed to create document");
        }
    }

    async getDocumentByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            const documents = await documentRepository.getDocumentByUserId(user.id);
            if (documents.length === 0) {
                throw new NotFoundError("Documents");
            }
            return documents;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching documents:", error);
            throw new InternalServerError("Failed to fetch documents");
        }
    }

    async updateDocument(userId: string, data: DocumentSchema) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            return await documentRepository.updateDocument(user.id, data);
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error updating document:", error);
            throw new InternalServerError("Failed to update document");
        }
    }
}

export const documentService = new DocumentService();