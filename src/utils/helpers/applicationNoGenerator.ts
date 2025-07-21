import {counterRedis} from "../../redis/counter.redis";
import dayjs from 'dayjs'
import {AppError, InternalServerError} from "../errors";


export async function applicationNoGenerator() {
    try {
        const currentDate = dayjs().format('YYMMDD');
        const counter = await counterRedis.incrementCounter(currentDate);
        if (!counter) {
            throw new InternalServerError("Failed to generate application number");
        }
        return `${currentDate}${String(counter).padStart(4, '0')}`;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.error("Error generating application number:", error);
        throw new InternalServerError("Failed to generate application number");
    }
}