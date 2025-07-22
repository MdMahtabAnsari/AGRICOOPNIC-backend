import serverConfig from "../configs/server.config";
import { sign, verify, JwtPayload } from "jsonwebtoken"
import { JwtPayloadSchema } from "../utils/schemas/jwt.payload.schema";
import { tokenRepositoy } from "../repositories/token.repository";
import { InternalServerError} from "../utils/errors";
import ms from "ms";

class JwtService {
    async createRefreshToken(data: JwtPayloadSchema) {
        try {
            const isTokenExists = await tokenRepositoy.getTokenByUserId(data.id);

            if (isTokenExists) {
                const date = new Date();
                if (date.getTime() >= isTokenExists.expiredAt.getTime()) {
                    await tokenRepositoy.deleteToken(data.id);
                } else {
                    return isTokenExists.token;
                }
            }
            const token = sign(data, serverConfig.JWT_SECRET, { expiresIn: ms('7d') / 1000 });
            await tokenRepositoy.createToken({
                userId: data.id,
                token,
                expiredAt: new Date(Date.now() + ms('7d'))
            });
            return token;
        } catch (error) {
            console.error(`Error in createRefreshToken Service: ${error}`);
            throw new InternalServerError();
        }
    }
    createAccessToken(data: JwtPayloadSchema) {
        try {
            return sign(data, serverConfig.JWT_SECRET, { expiresIn: ms('1d') / 1000 });
        } catch (error) {
            console.error(`Error in createAccessToken Service: ${error}`);
            throw new InternalServerError();
        }
    }

    getTokenLeftTime(token: string) {
        try {
            const decode = verify(token, serverConfig.JWT_SECRET) as JwtPayload;
            if (decode) {
                const exp = decode.exp;
                return exp ? exp * 1000 - Date.now() : 0;
            }
            return 0;
        } catch (error) {

            console.error(`Error in getTokenLeftTime Service: ${error}`);
            return 0;
        }
    }

    async createNewRefreshToken(data: JwtPayloadSchema) {
        try {
            const token = sign(data, serverConfig.JWT_SECRET, { expiresIn: ms('7d') / 1000 });
            const isTokenExists = await tokenRepositoy.getTokenByUserId(data.id);
            if (isTokenExists) {
                await tokenRepositoy.deleteToken(data.id);
            }
            await tokenRepositoy.createToken({
                userId: data.id,
                token,
                expiredAt: new Date(Date.now() + ms('7d'))
            });
            return token;
        } catch (error) {
            console.error(`Error in createNewRefreshToken Service: ${error}`);
            throw new InternalServerError();
        }
    }


}

export const jwtService = new JwtService();