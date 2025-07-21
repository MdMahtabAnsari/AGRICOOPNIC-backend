import { addressController } from "../controllers/address.controller";
import { bodyValidator } from "../validators";
import { addressSchema } from "../utils/schemas/address.schema";
import { Router } from "express";

const addressRouter:Router = Router();

addressRouter.post("/create", bodyValidator(addressSchema), addressController.createAddress);
addressRouter.get("/", addressController.getAddressByUserId);
addressRouter.put("/update", bodyValidator(addressSchema), addressController.updateAddress);

export default addressRouter;
