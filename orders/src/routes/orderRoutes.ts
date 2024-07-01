import { Router } from 'express';
import { createOrder, getOrder, updateOrderStatus, deleteOrder } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/:orderId', getOrder);
router.put('/:orderId', updateOrderStatus);
router.delete('/:orderId', deleteOrder);

export default router;