import { classController } from "../../controller/user/loginController.js";
import { auth } from "../../middleware/auth.js";
import { Router } from "express";
const router = Router();

router.post("/addUser", classController.addUser);
// router.get("/getUser", auth, classController.getUser);
router.put("/updateUser/:id", classController.updateUser);
//  router.delete("/deleteUser/:id", classController.deleteUser);

router.post("/loginUser", classController.loginUser);
router.post("/sign_up", classController.sign_up);



export default router;
