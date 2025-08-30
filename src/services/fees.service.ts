import { InternalServerError, AppError, NotFoundError } from "../utils/errors";
import { CategoryType } from "../utils/schemas/category.schema";
import { feesRepository } from "../repositories/fees.repository";

class FeesService {
    async getFeesByCategory(categoryType: CategoryType) {
        try {
            // Fetch fees based on category type
            const fees = await feesRepository.getFeesByCategory(categoryType);
            if (!fees) {
                throw new NotFoundError("Fees not found");
            }
            return fees;
        } catch (error) {
            console.error("Error fetching fees:", error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to fetch fees");
        }
    }
}

export const feesService = new FeesService();
