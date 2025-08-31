import userRouter from "./user.route";
import otpRouter from "./otp.route";
import jobPostRouter from "./jobPost.route";
import categoryRouter from "./category.route";
import familyRouter from "./family.route";
import addressRouter from "./address.route";
import educationRouter from "./education.route";
import documentRouter from "./document.route";
import examinationPreferenceRouter from "./examinationPreference.route";
import formSubmittedRouter from "./formSubmitted.route";
import personalDetailRouter from "./personalDetail.route";
import paymentRouter from "./payment.route";
import authRouter from "./auth.route";
import feesRouter from "./fees.route";
import applicationRouter from "./application.route";
import contactRouter from "./contact.route";
import { Express } from "express";
import { errorHandler } from "../middlewares/errorHandler.middleware";

const routes = (app: Express) => {
    app.use("/api/users", userRouter);
    app.use("/api/otp", otpRouter);
    app.use("/api/job-posts", jobPostRouter);
    app.use("/api/categories", categoryRouter);
    app.use("/api/families", familyRouter);
    app.use("/api/addresses", addressRouter);
    app.use("/api/education", educationRouter);
    app.use("/api/documents", documentRouter);
    app.use("/api/examination-preferences", examinationPreferenceRouter);
    app.use("/api/personal-details", personalDetailRouter);
    app.use("/api/form-submitted", formSubmittedRouter);
    app.use("/api/payments", paymentRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/fees", feesRouter);
    app.use("/api/applications", applicationRouter);
    app.use("/api/contact", contactRouter);
    app.use(errorHandler);
}

export default routes;