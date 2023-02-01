import loginRoutes from "./loginRouter.js";
import productRoutes from "./productRouter.js";
import commentRoutes from "./commentRouter.js";
 import cartRoutes from "./cartRouter.js";
import { Router } from "express";
const router = Router();

router.use("/login", loginRoutes)
router.use("/product", productRoutes)
router.use("/comment", commentRoutes)
router.use("/cart", cartRoutes)
export default router;