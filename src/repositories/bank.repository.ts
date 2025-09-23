import { prisma } from "../configs/prisma.config";
import { InternalServerError } from "../utils/errors";



class BankRepository {

    async getBankDetails() {
        try {
            return await prisma.bank.findFirst();
        } catch (error) {
            console.error("Error fetching bank details:", error);
            throw new InternalServerError("Failed to fetch bank details");
        }
    }
}

export const bankRepository = new BankRepository();
