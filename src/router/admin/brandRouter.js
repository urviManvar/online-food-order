import { brandController } from "../../controller/admin/brandController.js";
import { Router } from "express";
const router = Router();

router.post("/addBrand", brandController.addBrand);
router.put("/updateBrand/:id", brandController.updateBrand);
router.delete("/deleteBrand/:id", brandController.deleteBrand);

export default router;
