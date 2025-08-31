import { InternalServerError, AppError} from "../utils/errors";
import { emailService } from "../email/email.service";
import { ContactSchema } from "../utils/schemas/contact";
import { ContactEmailData } from '../email/email.service';

class ContactService {
    async submitContactForm(data: ContactSchema) {
        try {
            const templateFormat: ContactEmailData = {
                to:"support@agricoopnic.org",
                template: { data }
            };
            await emailService.sendContactEmail(templateFormat);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            if (error instanceof AppError) {
                throw error;
            }
            throw new InternalServerError('Failed to submit contact form');
        }
    }
}

export const contactService = new ContactService();

