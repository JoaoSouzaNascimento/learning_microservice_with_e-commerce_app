import { Order, OrderStatus } from '../models/order';
import OrderItem from '../models/orderItem';
import { sendMessage } from '../kafka/producer';

class OrderService {
  static async createOrder(userId: number, items: { productId: number, quantity: number, price: number }[]) {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({ userId, totalAmount, status: OrderStatus.Pending });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    await sendMessage('stock-check', { orderId: order.id, items });

    return order;
  }

  static async getOrder(orderId: number) {
    return await Order.findByPk(orderId, {
      include: [{
        model: OrderItem,
        as: 'items',
      }],
    });
  }

  static async updateOrderStatus(orderId: number, status: OrderStatus) {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    order.status = status;

    if (status === OrderStatus.Cancelled) {
      const items = await OrderItem.findAll({ where: { orderId } });
      const itemsToRevert = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      await sendMessage('stock-revert', { items: itemsToRevert });
    }
    
    return await order.save();
  }

  static async deleteOrder(orderId: number) {
    const order = await Order.findByPk(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    await OrderItem.destroy({ where: { orderId } });
    await order.destroy();
  }
}

export default OrderService;