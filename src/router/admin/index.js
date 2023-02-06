import categoryRoutes from "../admin/categaryRouter.js";
import productRoutes from "../admin/productRouter.js";
import userRouter from "../admin/userRouter.js";
import commentRouter from "../admin/commentRouter.js";
import addressRouter from "../admin/addressRouter.js";
import brandRouter from "../admin/brandRouter.js";
import { Router } from "express";
const router = Router();

router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/address", addressRouter);
router.use("/brand", brandRouter);

export default router;
