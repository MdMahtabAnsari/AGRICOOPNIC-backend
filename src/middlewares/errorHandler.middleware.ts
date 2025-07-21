import { Request, Response } from "express";
import { AppError } from "../utils/errors";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status,
            isOperational: err.isOperational,
            data: null,
            statusCode: err.statusCode,
        });
    }
    else {
        console.error("Unhandled Error:", err);
        res.status(500).json({
            message: "Internal Server Error",
            status: "error",
            isOperational: false,
            data: null,
            statusCode: 500,
        });
    }
};