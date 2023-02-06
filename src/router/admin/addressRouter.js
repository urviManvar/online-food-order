import { addressController } from "../../controller/admin/addressController.js";
import { Router } from "express";
const router = Router();

router.get("/getAddressData", addressController.getAddressData);

export default router;
