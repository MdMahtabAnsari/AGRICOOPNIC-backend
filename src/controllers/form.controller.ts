import { formService } from "../services/form.service";
import { Request, Response, NextFunction } from "express";
import { excelService } from "../services/excel.service";

class FormController {
    async getAllSubmittedFormsDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const forms = await formService.getAllSubmittedFormsDetails();
            return res.status(200).json({
                message: "Submitted forms fetched successfully",
                status: "success",
                isOperational: true,
                data: forms,
                statusCode: 200,
            });
        } catch (error) {
            next(error);
        }
    }

    async exportFormsToExcel(req: Request, res: Response, next: NextFunction) {
        try {
            const excelBuffer = await excelService.generateExcelReport();
            res.setHeader('Content-Disposition', 'attachment; filename="submitted_forms.xlsx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(excelBuffer);
        } catch (error) {
            next(error);
        }
    }
}

export const formController = new FormController();

