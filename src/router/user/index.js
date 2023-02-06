import loginRoutes from "./loginRouter.js";
import productRoutes from "./productRouter.js";
import commentRoutes from "./commentRouter.js";
import cartRoutes from "./cartRouter.js";
import addressRouter from "./addressRouter.js";
import brandRouter from "./brandRouter.js";
import { Router } from "express";
const router = Router();

router.use("/login", loginRoutes);
router.use("/product", productRoutes);
router.use("/comment", commentRoutes);
router.use("/cart", cartRoutes);
router.use("/address", addressRouter);
router.use("/brand", brandRouter);
export default router;
