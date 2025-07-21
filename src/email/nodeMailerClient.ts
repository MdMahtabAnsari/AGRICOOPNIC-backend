import nodemailer, { Transporter } from 'nodemailer';
import { emailConfig } from '../configs/email.config';

class NodeMailerClient {
  private readonly transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig);
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('Error verifying email transporter:', error);
      } 
      else if( success) {
        console.log('Email transporter is ready to send emails.');
      }
    });
  }
  getTransporter(): Transporter {
    return this.transporter;
  }
}

// Export singleton transporter
export const transporter = new NodeMailerClient().getTransporter();
