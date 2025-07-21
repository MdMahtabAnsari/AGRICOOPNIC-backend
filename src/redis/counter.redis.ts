import {redisClient} from "./redisClient";

class CounterRedis {
    private getCounterKey(key: string): string {
        return `counter:${key}`;
    }

    async incrementCounter(key: string) {
        try {
            const counterKey = this.getCounterKey(key);
            const counter = await redisClient.incr(counterKey);
            if (counter === 1) {
                // Set an expiration time of 24 hours for the counter key
                await redisClient.expire(counterKey, 86400); // 86400 seconds = 24 hours
            }
            return counter;

        } catch (error) {
            console.error('Error incrementing counter in Redis', error);
            return null;
        }
    }
}

export const counterRedis = new CounterRedis();