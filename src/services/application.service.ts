import {applicationRepository} from '../repositories/application.repository';
import {InternalServerError,NotFoundError,AppError} from "../utils/errors";
import { paymentRepository } from '../repositories/payment.repository';

class ApplicationService{
    async getApplicationByUserId(userId:string){
        try{
            const application = await applicationRepository.getApplicationByUserId(userId);
            if (!application) {
                throw new NotFoundError("Application not found");
            }
            if(application.category?.categoryType){
                const payment = await paymentRepository.getUserSuccessfulPaymentWithCategory(userId, application.category.categoryType);
                return { ...application, payment };
            }
            return application;
        } catch (error) {
            console.error("Error retrieving application by userId:", error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError("Failed to retrieve application");
        }
    }
}

export const applicationService = new ApplicationService();
