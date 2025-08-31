import { contactService } from "../services/contact.service";
import { Request, Response, NextFunction } from "express";


class ContactController {
    async submitContactForm(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            await contactService.submitContactForm(data);
            return res.status(201).json({
                message: "Contact form submitted successfully",
                status: "success",
                isOperational: true,
                data: null,
                statusCode: 201,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const contactController = new ContactController();
