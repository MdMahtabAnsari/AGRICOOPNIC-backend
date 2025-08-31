import {Job} from 'bull';
import { conformationEmailQueue } from '../conformationEmail.queue';
import { applicationConformationEmailQueue } from '../applicationConformationEmail.queue';
import { emailService } from '../../email/email.service';

class MultiQueueWorker {
  constructor() {
    this.startConformationEmailProcessing();
    this.startApplicationConformationEmailProcessing();
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


  async close() {
    await conformationEmailQueue.close();
    await applicationConformationEmailQueue.close();
  }
}

export default MultiQueueWorker;