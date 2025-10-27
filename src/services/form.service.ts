import { formRepository } from "../repositories/form.repository";
import { InternalServerError, AppError } from "../utils/errors";
import { conformationEmailQueueReact } from "../queue/conformationEmailReact.queue";

import { ConfirmationEmailData } from "../email/email.service";

class FormService {
    async getAllSubmittedFormsDetails() {
        try {
            const forms = await formRepository.getAllSubmitedFormsDetails();
            const formatedForms = forms.map(form => {
                const formatData:ConfirmationEmailData = {
                    to:"info@agricoopnic.org",
                    template:{
                        data:form
                    }
                }
                return formatData;
            });

            await conformationEmailQueueReact.addEmailToQueueInBulk(formatedForms);
            return forms;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error fetching submitted forms details:", error);
            throw new InternalServerError("Failed to fetch submitted forms details");
        }
    }
}

export const formService = new FormService();
