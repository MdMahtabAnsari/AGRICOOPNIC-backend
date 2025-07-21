import Bull, { Queue, QueueOptions } from 'bull';
import serverConfig from '../configs/server.config';

class BullClient {
  private readonly bullQueue: Queue;
  private readonly url: URL;

  constructor(queueName: string, options?: QueueOptions) {
    this.url = new URL(serverConfig.REDIS_URL);

    const defaultOptions: QueueOptions = {
      redis: {
        host: this.url.hostname,
        port: Number(this.url.port),
        username: this.url.username || undefined, // Add username support
        password: this.url.password,
        tls: this.url.protocol === 'rediss:' ? {} : undefined,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
      },
    };

    this.bullQueue = new Bull(queueName, { ...defaultOptions, ...options });
    this.bullQueue.on('error', (error) => {
      console.error(`Bull queue error in ${queueName}:`, error);
    });

  }

  getQueue(): Queue {
    return this.bullQueue;
  }

  async close() {
    try {
      await this.bullQueue.close();
      console.log(`Bull queue ${this.bullQueue.name} closed successfully.`);
    } catch (error) {
      console.error(`Error closing Bull queue ${this.bullQueue.name}:`, error);
    }
  }
}

export default BullClient;