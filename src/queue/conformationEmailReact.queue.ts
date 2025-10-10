import BullClient from "./bullClient";
import { ConfirmationEmailData } from "../email/email.service";

class ConformationEmailQueueReact {
    private readonly bullClient: BullClient;

    constructor() {
        this.bullClient = new BullClient('conformation-email-queue-react');
    }

    getQueue() {
        return this.bullClient.getQueue();
    }

    async addEmailToQueue(data: ConfirmationEmailData) {
        try {
            const job = await this.getQueue().add(data)
            console.log(`Job added to conformation email queue with ID: ${job.id}`);
            return job;
        } catch (error) {
            console.error('Error adding job to conformation email queue:', error);
            throw error;
        }
    }

    async close() {
        await this.bullClient.close();
    }

}

export const conformationEmailQueueReact = new ConformationEmailQueueReact();