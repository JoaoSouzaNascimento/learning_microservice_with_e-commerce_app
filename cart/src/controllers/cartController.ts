import { Request, Response } from 'express';
import CartService from '../services/cartService';

const addItem = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cartItem = await CartService.addItem(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

const removeItem = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;
  try {
    await CartService.removeItem(Number(userId), Number(productId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};

const getCart = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const cartItems = await CartService.getCart(Number(userId));
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

export { addItem, removeItem, getCart };