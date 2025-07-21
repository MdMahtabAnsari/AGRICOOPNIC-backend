import { prisma } from "../configs/prisma.config";
import { Prisma } from "../../generated/prisma";
import { InternalServerError,NotFoundError,BadRequestError,ConflictError } from "../utils/errors";
import { DocumentSchema } from "../utils/schemas/document.schema";

class DocumentRepository {
    async createDocument(userId: string, data: DocumentSchema) {
        try {
            const document = await prisma.document.create({
                data: {
                    userId,
                    ...data
                }
            });
            return document;
        } catch (error) {
            console.error("Error creating document:", error);
            if( error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Document with this ID already exists");
                } else if (error.code === 'P2025') {
                    throw new NotFoundError("Document");
                } else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Error creating document");
        }
    }

    async getDocumentByUserId(userId: string) {
        try {
            const documents = await prisma.document.findMany({
                where: { userId }
            });
            return documents;
        } catch (error) {
            console.error("Error fetching documents:", error);
            throw new InternalServerError("Error fetching documents");
        }
    }

    async updateDocument(userId: string, data: DocumentSchema) {
        try {
            const document = await prisma.document.update({
                where: { userId_documentType: { userId, documentType: data.documentType } },
                data
            });
            return document;
        } catch (error) {
            console.error("Error updating document:", error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictError("Document with this ID already exists");
                }
                else if (error.code === 'P2025') {
                    throw new NotFoundError("Document");
                }
                else if (error.code === 'P2003') {
                    throw new BadRequestError("Invalid data provided");
                }
            }
            throw new InternalServerError("Error updating document");
        }
    }
}

export const documentRepository = new DocumentRepository();