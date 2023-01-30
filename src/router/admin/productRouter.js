import { productController } from "../../controller/admin/productController.js";
// import {auth} from "../middleware/auth.js";
import {Router} from "express";
 const router =Router();


 router.post("/addProduct",productController.addProduct);
//  router.get("/getProduct",productController.getProduct);
 router.put("/updateproduct/:id",productController.updateProduct);
 router.delete("/deleteproduct/:id",productController.deleteProduct);
// router.get('/getProductData',productController.getProductData);

export default  router;