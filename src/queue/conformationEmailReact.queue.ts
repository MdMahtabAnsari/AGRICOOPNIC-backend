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

    async addEmailToQueueInBulk(dataArray: ConfirmationEmailData[]) {
        try {
            const jobs = await this.getQueue().addBulk(
                dataArray.map(data => ({ data }))
            );
            console.log(`Added ${jobs.length} jobs to conformation email queue.`);
            return jobs;
        } catch (error) {
            console.error('Error adding bulk jobs to conformation email queue:', error);
            throw error;
        }
    }

}

export const conformationEmailQueueReact = new ConformationEmailQueueReact();