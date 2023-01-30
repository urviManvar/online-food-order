import { commentController} from '../../controller/admin/commentController.js';
import  {Router}  from 'express';
const router = Router();    


router.get("/getComment",commentController.getComment);
router.delete("/deleteComment",commentController.deleteComment);
export default router;