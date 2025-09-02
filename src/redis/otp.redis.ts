import {redisClient} from "./redisClient";

class OTPRedis {
    private getOTPKey(email: string): string {
        return `otp:${email}`;
    }

    async setOTP(email:string, otp:string){
        try{
            const key = this.getOTPKey(email);
            const result = await redisClient.set(key, otp);
            await redisClient.expire(key, 600);
            return result === 'OK';
        } catch (error) {
            console.error('Error setting OTP in Redis', error);
            return false;
        }
    }

    async getOTP(email:string) {
        try {
            const key = this.getOTPKey(email);
            return await redisClient.get(key);
        } catch (error) {
            console.error('Error getting OTP from Redis', error);
            return null;
        }
    }
    async deleteOTP(email:string) {
        try {
            const key = this.getOTPKey(email);
            return await redisClient.del(key);
        } catch (error) {
            console.error('Error deleting OTP from Redis', error);
            return false;
        }
    }
}

export const otpRedis = new OTPRedis();
