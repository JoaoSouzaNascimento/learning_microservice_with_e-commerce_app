import { Router } from 'express';
import { addItem, removeItem, getCart } from '../controllers/cartController';

const router = Router();

router.post('/', addItem);
router.delete('/:userId/:productId', removeItem);
router.get('/:userId', getCart);

export default router;