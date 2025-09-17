import { toDataURL } from "qrcode";
import { InternalServerError } from "../utils/errors";


class QRCodeService {
    async generateQRCode(data: string): Promise<string> {
        try {
            const qrCodeDataUrl = await toDataURL(data, { errorCorrectionLevel: 'H', type: 'image/png', width: 300});
            return qrCodeDataUrl;
        } catch (error) {
            console.error("Error generating QR code:", error);
            throw new InternalServerError("Failed to generate QR code.");
        }
    }
}

export const qrCodeService = new QRCodeService();
