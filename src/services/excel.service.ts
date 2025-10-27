import ExcelJS from "exceljs";
import { formRepository } from "../repositories/form.repository";
import { InternalServerError, AppError } from "../utils/errors";
import { DateTime } from "luxon";

function formatJobPostName(jobPostName: string) {
    const jobPostMap: Record<string, string> = {
        'MTS': 'Multi Tasking Staff',
        'SUPERVISOR': 'Supervisor',
        'CLERK': 'Clerk',
        'ASSISTANT_AGRICULTURE_OFFICER': 'Assistant Agriculture Officer',
        'AGRICULTURE_OFFICER': 'Agriculture Officer',
        'FIELD_OFFICER': 'Field Officer'
    };
    return jobPostMap[jobPostName] || jobPostName;
}

function formatExamCenterName(examCenterName: string) {
    const examCenterMap: Record<string, string> = {
        'DELHI_NCR': 'Delhi NCR',
        'LUCKNOW': 'Lucknow',
        'AHMEDABAD': 'Ahmedabad',
        'BHOPAL': 'Bhopal',
        'MUMBAI': 'Mumbai',
        'KOLKATA': 'Kolkata',
        'BHUBANESWAR': 'Bhubaneswar',
        'RANCHI': 'Ranchi',
        'PATNA': 'Patna',
        'BANGALORE': 'Bangalore'
    };
    return examCenterMap[examCenterName] || examCenterName;
}

function formatDate(dateString: string | Date) {
    const date = typeof dateString === 'string' ? dateString : dateString.toISOString();
    return DateTime.fromISO(date).setZone('Asia/Kolkata').toFormat('dd MMM yyyy');
}

class ExcelService {
    async generateExcelReport() {
        try {
            const forms = await formRepository.getAllSubmitedFormsDetails();
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Form Submissions");

            // Define columns without fixed width
            worksheet.columns = [
                { header: "Application No", key: "applicationNo" },
                { header: "Name", key: "name" },
                { header: "Email", key: "email" },
                { header: "Post", key: "post" },
                { header: "DOB", key: "dob" },
                { header: "Preference 1", key: "preference1" },
                { header: "Preference 2", key: "preference2" },
                { header: "Preference 3", key: "preference3" },
            ];

            // Add rows
            forms.forEach((form) => {
                worksheet.addRow({
                    applicationNo: form.jobPost?.applicationNo || 'N/A',
                    name: form.user?.name || 'N/A',
                    email: form.user?.email || 'N/A',
                    post: formatJobPostName(form.jobPost?.name || ''),
                    dob: form.personalDetail?.dateOfBirth ? formatDate(form.personalDetail.dateOfBirth) : 'N/A',
                    preference1: formatExamCenterName(
                        form.examinationPreferences?.find(pref => pref.preferenceType === 'PREFERENCE_1')?.examCenterName
                        || 'N/A'
                    ),
                    preference2: formatExamCenterName(
                        form.examinationPreferences?.find(pref => pref.preferenceType === 'PREFERENCE_2')?.examCenterName
                        || 'N/A'
                    ),
                    preference3: formatExamCenterName(
                        form.examinationPreferences?.find(pref => pref.preferenceType === 'PREFERENCE_3')?.examCenterName
                        || 'N/A'
                    ),
                });
            });

            // Calculate dynamic column widths
            worksheet.columns.forEach((column, index) => {
                let maxLength = 0;

                // Check header length
                const headerLength = column.header?.toString().length || 0;
                maxLength = Math.max(maxLength, headerLength);

                // Check each cell in the column
                worksheet.getColumn(index + 1).eachCell({ includeEmpty: false }, (cell) => {
                    const cellValue = cell.value?.toString() || '';
                    maxLength = Math.max(maxLength, cellValue.length);
                });

                // Set width with some padding (minimum 10, maximum 50)
                column.width = Math.min(Math.max(maxLength + 2, 10), 50);
            });

            // Style the header row
            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };

            // Add borders to all cells
            worksheet.eachRow((row) => {
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            });

            // Generate buffer
            const buffer = await workbook.xlsx.writeBuffer();
            return buffer;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Error generating Excel report:", error);
            throw new InternalServerError("Error generating Excel report");
        }
    }
}

export const excelService = new ExcelService();