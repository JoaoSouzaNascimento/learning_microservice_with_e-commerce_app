import { Request, Response } from 'express';
import StockService from '../services/stockService';

const getStock = async (req: Request, res: Response) => {
  try {
    const stock = await StockService.getStock(req.query);
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve stock' });
  }
};

const updateStock = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  
  try {
    const stock = await StockService.updateStock(Number(productId), Number(quantity));
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update stock quantity' });
  }
};

const deleteStock = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    await StockService.deleteStock(Number(productId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete stock' });
  }
};

export { getStock, updateStock, deleteStock };