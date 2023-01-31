import { commentController} from '../../controller/user/commentController.js'
import  {Router}  from 'express';
const router = Router();    


router.post("/addComment",commentController.addComment);
router.put("/updateComment/:id",commentController.updateComment);

export default router;