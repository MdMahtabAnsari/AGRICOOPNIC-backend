import BullClient from "./bullClient";
import {  ContactEmailData } from "../email/email.service";

class ContactEmailQueue {
    private readonly bullClient: BullClient;

    constructor() {
        this.bullClient = new BullClient('contact-email-queue');
    }

    getQueue() {
        return this.bullClient.getQueue();
    }

    async addEmailToQueue(data: ContactEmailData) {
        try {
            const job = await this.getQueue().add(data)
            console.log(`Job added to contact email queue with ID: ${job.id}`);
            return job;
        } catch (error) {
            console.error('Error adding job to contact email queue:', error);
            throw error;
        }
    }

    async close() {
        await this.bullClient.close();
    }

}

export const contactEmailQueue = new ContactEmailQueue();