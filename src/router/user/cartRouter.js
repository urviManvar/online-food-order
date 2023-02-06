import { cartController } from "../../controller/user/cart.js";
import { Router } from "express";
const router = Router();

router.post("/addToCart", cartController.addToCart);
router.get("/listCart", cartController.listCart);
router.put("/updateCart/:id", cartController.updateCart);
router.delete("/deleteCart/:id", cartController.deleteCart);

router.delete("/deleteInCart/:id", cartController.deleteInCart);

export default router;
