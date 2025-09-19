import { formSubmittedRepository } from "../repositories/formSubmitted.repository";
import { InternalServerError, AppError, NotFoundError, BadRequestError, UnauthorisedError } from "../utils/errors";
import { userRepository } from "../repositories/user.repository";
import { categoryRepository } from "../repositories/category.repository";
import { documentRepository } from "../repositories/document.repository";
import { educationRepository } from "../repositories/education.repository";
import { examinationPreferenceRepository } from "../repositories/examinationPreference.repository";
import { familyRepository } from "../repositories/family.repository";
import { jobPostRepository } from "../repositories/jobPost.repository";
import { personalDetailRepository } from "../repositories/personalDetail.repository";
import { addressRepository } from "../repositories/address.repository";
import { conformationEmailQueue } from "../queue/conformationEmail.queue";
import { paymentRepository } from "../repositories/payment.repository";
import { applicationConformationEmailQueue } from "../queue/applicationConformationEmail.queue";
import { MJMLApplicationConfirmation,MJMLConfirmation } from "../email/emailTemplate.service";

class FormSubmittedService {
    private async isEveythingSubmitted(userId: string) {
        try {
            const categoryRepositoryResult = await categoryRepository.getCategoryByUserId(userId);
            if (!categoryRepositoryResult) {
                throw new NotFoundError("Category");
            }
            console.log("category", categoryRepositoryResult);
            const documentRepositoryResult = await documentRepository.getDocumentByUserId(userId);
            if (documentRepositoryResult.length < 4) {
                throw new BadRequestError("Documents must be submitted");
            }
            const jobPostRepositoryResult = await jobPostRepository.getJobPostByUserId(userId);
            if (!jobPostRepositoryResult) {
                throw new NotFoundError("Job Post");
            }
            const educationRepositoryResult = await educationRepository.getEducationByUserId(userId);
            if (educationRepositoryResult.length < 1) {
                throw new BadRequestError("Education details must be submitted");
            }
            if (jobPostRepositoryResult.name != "MTS" && educationRepositoryResult.length < 2) {
                throw new BadRequestError("Education details must be submitted");
            }
            if ((jobPostRepositoryResult.name === "ASSISTANT_AGRICULTURE_OFFICER" || jobPostRepositoryResult.name === "AGRICULTURE_OFFICER" || jobPostRepositoryResult.name ==="FIELD_OFFICER") && educationRepositoryResult.length < 3) {
                throw new BadRequestError("Education details must be submitted");
            }
            const examinationPreferenceRepositoryResult = await examinationPreferenceRepository.getExaminationPreferenceByUserId(userId);
            if (examinationPreferenceRepositoryResult.length < 3) {
                throw new BadRequestError("Examination preferences must be submitted");
            }
            const familyRepositoryResult = await familyRepository.getFamilyByUserId(userId);
            if (!familyRepositoryResult) {
                throw new NotFoundError("Family details");
            }

            const personalDetailRepositoryResult = await personalDetailRepository.getPersonalDetailByUserId(userId);
            if (!personalDetailRepositoryResult) {
                throw new NotFoundError("Personal Details");
            }
            const addressRepositoryResult = await addressRepository.getAddressByUserId(userId);
            if (addressRepositoryResult.length < 2) {
                throw new BadRequestError("Address details must be submitted");
            }
            return {
                category: categoryRepositoryResult,
                documents: documentRepositoryResult,
                education: educationRepositoryResult,
                examinationPreferences: examinationPreferenceRepositoryResult,
                family: familyRepositoryResult,
                jobPost: jobPostRepositoryResult,
                personalDetail: personalDetailRepositoryResult,
                address: addressRepositoryResult
            };

        }
        catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error checking if everything is submitted:", error);
            throw new InternalServerError("Failed to check submission status");
        }
    }
    async makeFormSubmitted(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            const isEveythingSubmittedResult = await this.isEveythingSubmitted(user.id);
            const isUserPaymentCompleted = await paymentRepository.getUserSuccessfulPaymentWithCategory(user.userId,isEveythingSubmittedResult.category.categoryType);
            console.log("isUserPaymentCompleted",isUserPaymentCompleted);
            if (!isUserPaymentCompleted) {
                throw new UnauthorisedError(`Payment must be completed for category ${isEveythingSubmittedResult.category.categoryType} before submitting the form`);
            }
            const submit = await formSubmittedRepository.makeFormSubmitted(user.id);
            const template: MJMLConfirmation = {
                data: {
                    user: user,
                    address: isEveythingSubmittedResult.address,
                    category: isEveythingSubmittedResult.category,
                    examinationPreferences: isEveythingSubmittedResult.examinationPreferences,
                    documents: isEveythingSubmittedResult.documents,
                    education: isEveythingSubmittedResult.education.map(e => ({
                        qualification: e.qualification,
                        institution: e.institution,
                        boardOrUniversity: e.boardOrUniversity,
                        marksType: e.marksType,
                        marks: e.marks,
                        yearOfPassing: e.yearOfPassing,
                        subjectOrSpecialization: e.subjectOrSpecialization ?? undefined
                    })),
                    family: isEveythingSubmittedResult.family,
                    jobPost: isEveythingSubmittedResult.jobPost,
                    personalDetail: isEveythingSubmittedResult.personalDetail,
                    paymentDetails: {
                        ...isUserPaymentCompleted,
                        paymentId: isUserPaymentCompleted.paymentId ?? "",
                        url: isUserPaymentCompleted.url ?? undefined,
                        dateTime: isUserPaymentCompleted.dateTime ?? undefined
                    }
                    ,
                    formSubmission: {
                        id: submit.id,
                        submissionDate: submit.submissionDate,
                        status: submit.status
                    }
                }
            }
            const applicationConformationTemplate:MJMLApplicationConfirmation={
                data: {
                    name: user.name,
                    applicationNumber: isEveythingSubmittedResult.jobPost.applicationNo,
                    categoryType: isEveythingSubmittedResult.category.categoryType,
                    paymentAmount: isUserPaymentCompleted.amount,
                    jobPost: isEveythingSubmittedResult.jobPost.name
                }
            }
            await conformationEmailQueue.addEmailToQueue({
                to: "support@agricoopnic.org",
                template: template
            });
            await applicationConformationEmailQueue.addEmailToQueue({
                to: user.email,
                template: applicationConformationTemplate
            });

            return submit;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error making form submitted:", error);
            throw new InternalServerError("Failed to make form submitted");
        }
    }

    async getFormSubmittedByUserId(userId: string) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new NotFoundError("User");
            }
            const submitted = await formSubmittedRepository.getFormSubmittedByUserId(user.id);
            if (!submitted) {
                throw new NotFoundError("Form submission");
            }
            return submitted;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching form submitted:", error);
            throw new InternalServerError("Failed to fetch form submitted");
        }
    }
}

export const formSubmittedService = new FormSubmittedService();