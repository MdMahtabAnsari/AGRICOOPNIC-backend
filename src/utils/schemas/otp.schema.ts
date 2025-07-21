import {emailObject} from "./common.schema";

import {z} from 'zod/v4';

export const otpSchema = emailObject.extend(
    {
        otp: z.string().length(6, 'OTP must be exactly 6 characters').regex(/^\d{6}$/, 'OTP must contain only digits'),
    }
)