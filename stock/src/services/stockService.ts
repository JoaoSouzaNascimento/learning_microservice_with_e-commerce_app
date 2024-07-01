import Stock from '../models/stock';

class StockService {
  static async checkAndReserveStock(items: { productId: number, quantity: number, price: number }[]) {
    const reservedItems: { productId: number; quantity: number }[] = [];
    let totalAmount = 0;

    for (const item of items) {
      const stock = await Stock.findOne({ where: { productId: item.productId } });

      if (!stock || stock.quantity < item.quantity) {
        for (const reservedItem of reservedItems) {
          const revertStock = await Stock.findOne({ where: { productId: reservedItem.productId } });
          if (revertStock) {
            revertStock.quantity += reservedItem.quantity;
            await revertStock.save();
          }
        }
        return { success: false };
      }

      stock.quantity -= item.quantity;
      await stock.save();
      reservedItems.push(item);
      totalAmount += item.quantity * item.price;
    }

    return { success: true, totalAmount };
  }

  static async revertStockReservation(items: { productId: number, quantity: number }[]) {
    const reservedItems: { productId: number; quantity: number }[] = [];
    for (const item of reservedItems) {
      const stock = await Stock.findOne({ where: { productId: item.productId } });
      if (!stock) {
        throw new Error('Stock not found');
      }
      stock.quantity += item.quantity;
      await stock.save();
    }

    return { success: true };
  }

  static async createStock(productId: number, quantity: number) {
    return await Stock.create({productId, quantity});    
  }

  static async updateStock(productId: number, quantity: number) {
    const stock = await Stock.findOne({ where: { productId } });
    if (stock) {
      stock.quantity = quantity;
      return await stock.save();
    }
    throw new Error('Stock not found');
  }

  static async getStock(query: any) {
    return await Stock.findAll({ where:  query  });
  }

  static async deleteStock(productId: number) {
    const stock = await Stock.findByPk(productId);
    if (!stock) {
      throw new Error('Stock not found');
    }
    return await stock.destroy();
  }
}

export default StockService;