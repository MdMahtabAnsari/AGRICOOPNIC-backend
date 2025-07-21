import {AppError} from "./app.error";

export class ForbiddenError extends AppError {
    constructor(message: string | null = null) {
        super(message || 'Forbidden', 403);
    }
}