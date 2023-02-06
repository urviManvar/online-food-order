import { brandController } from "../../controller/user/brandController.js";
import { Router } from "express";
const router = Router();

router.get("/getBrand", brandController.getBrand);

export default router;
