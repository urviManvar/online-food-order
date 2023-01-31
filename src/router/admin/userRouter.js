import { classController } from "../../controller/admin/userController.js";
import {adminController} from "../../controller/admin/adminLogin.js";
import { auth } from "../../middleware/auth.js";
import { Router } from "express";
const router = Router();

router.get("/getUser", auth, classController.getUser);
// router.put("/updateUser/:id", classController.updateUser);
router.delete("/deleteUser/:id", classController.deleteUser);

router.post("/loginAdmin", adminController.loginAdmin);

export default router;
