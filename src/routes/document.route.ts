import { documentController } from "../controllers/document.cotroller";
import { Router } from "express";
import { bodyValidator } from "../validators";
import { documentSchema } from "../utils/schemas/document.schema";

const documentRouter = Router();

documentRouter.post("/create", bodyValidator(documentSchema), documentController.createDocument);
documentRouter.get("/", documentController.getDocumentByUserId);
documentRouter.put("/update", bodyValidator(documentSchema), documentController.updateDocument);

export default documentRouter;