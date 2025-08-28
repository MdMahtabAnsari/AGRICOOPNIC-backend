import BullClient from "./bullClient";
import {ApplicationConfirmationEmailData } from "../email/email.service";

class ApplicationConformationEmailQueue {
    private readonly bullClient: BullClient;

    constructor() {
        this.bullClient = new BullClient('conformation-application-queue');
    }

    getQueue() {
        return this.bullClient.getQueue();
    }

    async addEmailToQueue(data: ApplicationConfirmationEmailData) {
        try {
            const job = await this.getQueue().add(data)
            console.log(`Job added to application conformation email queue with ID: ${job.id}`);
            return job;
        } catch (error) {
            console.error('Error adding job to application conformation email queue:', error);
            throw error;
        }
    }

    async close() {
        await this.bullClient.close();
    }

}

export const applicationConformationEmailQueue = new ApplicationConformationEmailQueue();