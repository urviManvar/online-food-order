import {cartController} from "../../controller/user/cart.js";
import { Router } from "express";
const router = Router();

router.post("/addToCart", cartController.addToCart);
export default router;