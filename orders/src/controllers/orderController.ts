import { Request, Response } from 'express';
import OrderService from '../services/orderService';
import { OrderStatus } from '../models/orderStatus';

const createOrder = async (req: Request, res: Response) => {
  const { userId, items } = req.body;
  try {
    const order = await OrderService.createOrder(userId, items);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const getOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await OrderService.getOrder(Number(orderId));
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!Object.values(OrderStatus).includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const order = await OrderService.updateOrderStatus(Number(orderId), status);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    await OrderService.deleteOrder(Number(orderId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

export { createOrder, getOrder, updateOrderStatus, deleteOrder };