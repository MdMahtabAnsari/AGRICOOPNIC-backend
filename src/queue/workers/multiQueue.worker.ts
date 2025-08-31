import {Job} from 'bull';
import { conformationEmailQueue } from '../conformationEmail.queue';
import { applicationConformationEmailQueue } from '../applicationConformationEmail.queue';
import { emailService } from '../../email/email.service';
import { contactEmailQueue } from '../contactEmail.queue';

class MultiQueueWorker {
  constructor() {
    this.startConformationEmailProcessing();
    this.startApplicationConformationEmailProcessing();
    this.startContactEmailProcessing();
  }

  private startConformationEmailProcessing() {
    conformationEmailQueue.getQueue().process(async (job: Job) => {
      try {
        return await emailService.sendConfirmationEmail(job.data);
      } catch (error) {
        console.error('Error processing email job:', error);
        throw error; // Re-throw to let Bull handle retries
      }
    });
  }

  private startApplicationConformationEmailProcessing() {
    applicationConformationEmailQueue.getQueue().process(async (job: Job) => {
      try {
        return await emailService.sendApplicationConfirmationEmail(job.data);
      } catch (error) {
        console.error('Error processing email job:', error);
        throw error; // Re-throw to let Bull handle retries
      }
    });
  }

  private startContactEmailProcessing() {
    contactEmailQueue.getQueue().process(async (job: Job) => {
      try {
        return await emailService.sendContactEmail(job.data);
      } catch (error) {
        console.error('Error processing email job:', error);
        throw error; // Re-throw to let Bull handle retries
      }
    });
  }

  async close() {
    await contactEmailQueue.close();
    await conformationEmailQueue.close();
    await applicationConformationEmailQueue.close();
  }
}

export default MultiQueueWorker;