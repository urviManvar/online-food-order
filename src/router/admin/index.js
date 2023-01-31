import categoryRoutes from "../admin/categaryRouter.js";
import productRoutes from "../admin/productRouter.js";
import userRouter from "../admin/userRouter.js";
import commentRouter from "../admin/commentRouter.js";
import { Router } from "express";
const router = Router();

router.use("/category", categoryRoutes)
router.use("/product", productRoutes)
router.use("/user",userRouter)
router.use("/comment",commentRouter)


export default router;