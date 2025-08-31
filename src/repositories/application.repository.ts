import { prisma } from "../configs/prisma.config";
import { InternalServerError } from "../utils/errors";

class ApplicationRepository {
    async getApplicationByUserId(userId: string) {
        try {
            return await prisma.user.findFirst({
                where: { userId },
                include: {
                    personalDetail: true,
                    address: true,
                    education: true,
                    documents: true,
                    examinationPreferences: true,
                    formSubmitted: true,
                    category: true,
                    jobPost: true,
                    family: true
                }
            })
        } catch (error) {
            console.error("Error retrieving application by userId:", error);
            throw new InternalServerError("Failed to retrieve application");
        }
    }
}

export const applicationRepository = new ApplicationRepository();