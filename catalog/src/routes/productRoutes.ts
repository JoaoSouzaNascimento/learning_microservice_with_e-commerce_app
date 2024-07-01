import { Router } from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;