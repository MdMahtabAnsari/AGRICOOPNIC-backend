import { prisma } from "../configs/prisma.config";
import { Prisma, Education } from "../../generated/prisma";
import { InternalServerError, NotFoundError } from "../utils/errors";
import { ConformationPayload } from "../utils/schemas/conformationPayload.schema"

class FormRepository {
    async getAllSubmitedFormsDetails() {
        try {
            const forms = await prisma.formSubmitted.findMany({
                orderBy: {
                    user: {
                        formSubmitted: {
                            submissionDate: 'desc'
                        }
                    }
                },
                include: {
                    user: {
                        include: {
                            jobPost: true,
                            category: true,
                            family: true,
                            personalDetail: true,
                            address: true,
                            documents: true,
                            examinationPreferences: true,
                            education: true,
                            formSubmitted: true,
                        }
                    }
                },

            });

            if (forms.length === 0) {
                throw new NotFoundError("Submitted forms");
            }

            // Get all unique user IDs
            const userIds = forms.map(form => form.user.userId);

            // Query all payments in one batch
            const payments = await prisma.payment.findMany({
                where: {
                    userId: {
                        in: userIds
                    },
                    paymentStatus: "COMPLETED"
                }
            });

            // Create a map for quick payment lookup
            const paymentMap = new Map();
            payments.forEach(payment => {
                paymentMap.set(payment.userId, payment);
            });

            // Check if all forms have payments
            const formsWithPaymentsDetails = forms.map(form => {
                const payment = paymentMap.get(form.user.userId);
                if (!payment) {
                    throw new NotFoundError(`Payment details not found for user ${form.user.userId}`);
                }
                return {
                    ...form,
                    payment
                };
            });

            const fomatedForms: ConformationPayload[] = formsWithPaymentsDetails.map(form => {
                const details: ConformationPayload = {
                    user: form.user,
                    address: form.user.address,
                    category: form.user.category
                        ? { categoryType: form.user.category.categoryType }
                        : { categoryType: "GENERAL" }
                    ,
                    examinationPreferences: form.user.examinationPreferences,
                    documents: form.user.documents,
                    education: form.user.education.map((edu: Education) => ({
                        qualification: edu.qualification,
                        institution: edu.institution,
                        boardOrUniversity: edu.boardOrUniversity,
                        marksType: edu.marksType,
                        marks: edu.marks,
                        yearOfPassing: edu.yearOfPassing,
                        subjectOrSpecialization: edu.subjectOrSpecialization ?? undefined
                    })),
                    paymentDetails: {
                        id: form.payment?.id || "",
                        amount: form.payment?.amount || 0,
                        paymentId: form.payment?.paymentId || "",
                        orderId: form.payment?.orderId || "",
                        paymentStatus: form.payment?.paymentStatus || "PENDING",
                        createdAt: form.payment?.createdAt || new Date(),
                        updatedAt: form.payment?.updatedAt || new Date(),
                        url: form.payment?.url ?? undefined,
                        dateTime: form.payment?.dateTime ?? undefined
                    },
                    family: {
                        fatherName: form.user.family?.fatherName || "",
                        motherName: form.user.family?.motherName || "",
                    },
                    personalDetail: {
                        gender: form.user.personalDetail?.gender || "OTHER",
                        nationality: form.user.personalDetail?.nationality || "",
                        dateOfBirth: form.user.personalDetail?.dateOfBirth || new Date(),
                    },
                    formSubmission: {
                        id: form.id,
                        submissionDate: form.submissionDate,
                        status: form.status
                    },
                    jobPost: {
                        applicationNo: form.user.jobPost?.applicationNo || "",
                        name: form.user.jobPost?.name || "MTS",
                    }
                };
                return details;
            });

            return fomatedForms;
        } catch (error) {
            console.error("Error fetching submitted forms:", error);
            if (error instanceof NotFoundError) {
                throw error; // Re-throw NotFoundError as is
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundError("Submitted forms not found");
                }
            }
            throw new InternalServerError("Failed to fetch submitted forms");
        }
    }
}

export const formRepository = new FormRepository();