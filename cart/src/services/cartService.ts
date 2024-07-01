import CartItem from '../models/cartItem';

class CartService {
  static async addItem(userId: number, productId: number, quantity: number) {
    const cartItem = await CartItem.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      return await cartItem.save();
    }
    return await CartItem.create({ userId, productId, quantity });
  }

  static async removeItem(userId: number, productId: number) {
    const cartItem = await CartItem.findOne({ where: { userId, productId } });
    if (!cartItem) {
      throw new Error('Item not found in cart');
    }
    await cartItem.destroy();
  }

  static async getCart(userId: number) {
    return await CartItem.findAll({ where: { userId } });
  }
}

export default CartService;