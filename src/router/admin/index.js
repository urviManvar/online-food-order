import categoryRoutes from "../admin/categaryRouter.js";
import productRoutes from "../admin/productRouter.js";
import { Router } from "express";
const router = Router();

router.use("/category", categoryRoutes)
router.use("/product", productRoutes)


export default router;