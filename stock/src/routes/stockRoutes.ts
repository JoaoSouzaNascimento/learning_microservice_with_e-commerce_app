import { Router } from 'express';
import { getStock, updateStock, deleteStock } from '../controllers/stockController';

const router = Router();

router.get('/', getStock);
router.put('/:productId', updateStock);
router.delete('/:productId', deleteStock);

export default router;
