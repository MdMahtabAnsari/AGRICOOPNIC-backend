import { prisma } from "../configs/prisma.config";
import { InternalServerError } from "../utils/errors";
import { CategoryType } from "../utils/schemas/category.schema";
class FeesRepository {
    async getFeesByCategory(categoryType: CategoryType) {
        try {
            const fees = await prisma.fees.findFirst({
                where: { categoryType }
            });
            return fees;
        } catch (error) {
            console.error("Error fetching fees by category:", error);
            throw new InternalServerError("Failed to fetch fees by category");
        }
    }

    async isFreeCategory(categoryType: CategoryType) {
        try {
            const fees = await prisma.fees.findFirst({
                where: { categoryType }
            });
            return fees?.amount === 0;
        } catch (error) {
            console.error("Error checking if category is free:", error);
            throw new InternalServerError("Failed to check if category is free");
        }
    }
}

export const feesRepository = new FeesRepository();