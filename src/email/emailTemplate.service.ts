import Handlebars from "handlebars";
import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';
import { ConformationPayload } from "../utils/schemas/conformationPayload.schema";
import { DateTime } from 'luxon'

export interface MJMLOtp {
    data: {
        otp: string;
        expiresIn: number;
    }
}

export interface MJMLConfirmation {
    data: ConformationPayload;
}


class EmailTemplateService {

    constructor() {
        this.registerHelpers();
    }
    private registerHelpers() {
        Handlebars.registerHelper('formatDate', (dateString: string) => {
            return DateTime.fromISO(dateString).setZone('Asia/Kolkata').toFormat('dd/MM/yyyy');
        });

        Handlebars.registerHelper('formatJobPost', function (jobPostName: string) {
            const jobPostMap: Record<string, string> = {
                'ASSISTANT_BRANCH_MANAGER': 'Assistant Branch Manager',
                'RELATIONSHIP_MANAGER': 'Relationship Manager',
                'MULTITASKING_STAFF': 'Multitasking Staff',
                'BLOCK_SUPERVISOR': 'Block Supervisor'
            };
            return jobPostMap[jobPostName] || jobPostName;
        });

        Handlebars.registerHelper('formatCategory', function (category: string) {
            const categoryMap: Record<string, string> = {
                'EWS_OR_OBC': 'EWS/OBC',
                'SC_OR_ST': 'SC/ST',
                'PWBD': 'PWBD',
                'GENERAL': 'General'
            };
            return categoryMap[category] || category;
        });
        Handlebars.registerHelper('formatGender', function (gender: string) {
            const genderMap: Record<string, string> = {
                'MALE': 'Male',
                'FEMALE': 'Female',
                'OTHER': 'Other'
            };
            return genderMap[gender] || gender;
        });
        Handlebars.registerHelper('formatAddressType', function (addressType: string) {
            const addressTypeMap: Record<string, string> = {
                'PERMANENT': 'Permanent',
                'CORRESPONDENCE': 'Correspondence'
            };
            return addressTypeMap[addressType] || addressType;
        });
        Handlebars.registerHelper('formatExamCenterName', function (examCenterName: string) {
            const examCenterMap: Record<string, string> = {
                'DELHI_NCR': 'Delhi NCR',
                'BHUBANESWAR': 'Bhubaneswar',
                'AHMEDABAD': 'Ahmedabad',
                'KOLKATA': 'Kolkata',
                'HARYANA': 'Haryana'
            };
            return examCenterMap[examCenterName] || examCenterName;
        });
        Handlebars.registerHelper('formatQualification', function (qualification: string) {
            const qualificationMap: Record<string, string> = {
                'MATRICULATION': 'Matriculation',
                'INTERMEDIATE_OR_DIPLOMA': 'Intermediate/Diploma',
                'GRADUATION': 'Graduation'
            };
            return qualificationMap[qualification] || qualification;
        });
        Handlebars.registerHelper('formatDocumentType', function (documentType: string) {
            const documentTypeMap: Record<string, string> = {
                'PHOTO': 'Photo',
                'SIGNATURE': 'Signature',
                'AADHAAR_FRONT': 'Aadhaar Front',
                'AADHAAR_BACK': 'Aadhaar Back'
            };
            return documentTypeMap[documentType] || documentType;
        });
        Handlebars.registerHelper('choiceLabel', function (index: number) {
            const labels = ['First', 'Second'];
            return labels[index] || `${index + 1}th`;
        })
         Handlebars.registerHelper('eq', function (a: string | number | boolean, b: string | number | boolean) {
            return a === b;
        });
        
        // Fix: Proper Handlebars helper signature
        Handlebars.registerHelper('or', function (this: unknown, ...args: unknown[]) {
            // The last argument is always the Handlebars options object
            const values = args.slice(0, -1);
            // Return true if any value is truthy
            return values.some(val => !!val);
        });
    }


    async otpMjmlToHtml(template: MJMLOtp) {
        try {
            const templatePath = path.join(__dirname, `../../email/otp.mjml`);
            console.log(`Template Path: ${templatePath}`);
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Template file not found: ${templatePath}`);
            }
            const mjmlTemplate = await fs.promises.readFile(templatePath, 'utf-8');
            const year = new Date().getFullYear();
            const mjml = Handlebars.compile(mjmlTemplate)({ ...template.data, year });
            const { html } = mjml2html(mjml);
            return html;
        } catch (error) {
            console.log(`Error in mjmlToHtml Services: ${error}`);
            throw error;
        }

    }

    async confirmationMjmlToHtml(template: MJMLConfirmation) {
        try {
            const templatePath = path.join(__dirname, `../../email/confirmation.mjml`);
            console.log(`Template Path: ${templatePath}`);
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Template file not found: ${templatePath}`);
            }
            const mjmlTemplate = await fs.promises.readFile(templatePath, 'utf-8');
            const mjml = Handlebars.compile(mjmlTemplate)(template.data);
            const { html } = mjml2html(mjml);
            return html;
        } catch (error) {
            console.log(`Error in mjmlToHtml Services: ${error}`);
            throw error;
        }
    }
}


export const emailTemplateService = new EmailTemplateService();