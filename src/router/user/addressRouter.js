import { addressController } from "../../controller/user/addressController.js";
import { Router } from "express";
const router = Router();

router.post("/addAddress", addressController.addAddress);
router.put("/updateAddress/:id", addressController.updateAddress);
router.get("/getAddress", addressController.getAddress);
router.delete("/deleteAddress/:id", addressController.deleteAddress);

export default router;
