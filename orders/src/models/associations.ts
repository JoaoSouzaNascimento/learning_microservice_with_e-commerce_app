import { Order } from './order';
import OrderItem from './orderItem';

const defineAssociations = () => {
  Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'items',
  });

  OrderItem.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order',
  });
};

export default defineAssociations;