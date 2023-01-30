import { productDataController} from '../../controller/user/productController.js'
import  {Router}  from 'express';
const router = Router();    


router.get("/getProduct",productDataController.getProductData);

export default router;