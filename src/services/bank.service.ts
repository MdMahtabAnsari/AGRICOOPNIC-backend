import { bankRepository } from "../repositories/bank.repository";
import { InternalServerError,NotFoundError,AppError } from "../utils/errors";

class BankService {

    async getBankDetails() {
        try {
            const bankDetails = await bankRepository.getBankDetails();
            if (!bankDetails) {
                throw new NotFoundError("Bank details not found");
            }
            return bankDetails;
        } catch (error) {
            console.error("Error in getBankDetails:", error);
            if(error instanceof AppError){
                throw error;
            }
            throw new InternalServerError("Failed to get bank details");
        }
    }
}

export const bankService = new BankService();
