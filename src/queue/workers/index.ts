import MultiQueueWorker from "./multiQueue.worker";

class WorkerManager {
  private worker: MultiQueueWorker;

  constructor() {
    try {
      this.worker = new MultiQueueWorker();
      this.setupGracefulShutdown();
    } catch (error) {
      console.error('❌ Failed to start workers:', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown() {
    const shutdown = async (signal: string) => {

        console.log(`🔄 Received ${signal}. Shutting down gracefully...`);
        try {
            await this.worker.close();
            console.log('✅ Workers closed successfully.');
        } catch (error) {
            console.error('❌ Error during shutdown:', error);
        } finally {
            process.exit(0);
        }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      shutdown('uncaughtException');
    });
  }
}

new WorkerManager();