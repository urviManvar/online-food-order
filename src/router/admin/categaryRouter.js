import { categoryController } from "../../controller/admin/categoryController.js";
import {Router} from "express";
 const router =Router();


router.post("/addCategory",categoryController.addCategory);
router.get("/getCategory",categoryController.getCategory);
router.put("/updateCategory/:id",categoryController.updateCategory);
router.delete("/deleteCategory/:id",categoryController.deleteCategory);
export default  router;