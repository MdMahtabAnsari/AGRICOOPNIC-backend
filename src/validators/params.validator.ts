import { ZodObject, ZodRawShape } from "zod/v4";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../utils/errors";
import { fromError } from "zod-validation-error/v4";


export const paramsValidator = (schema: ZodObject<ZodRawShape>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.params);
            next();
        } catch (error) {
            next(new BadRequestError(fromError(error).message));
        }
    };
};
