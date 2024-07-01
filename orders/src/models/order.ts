import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { OrderStatus } from './orderStatus';

interface OrderAttributes {
  id: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public totalAmount!: number;
  public status!: OrderStatus;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        totalAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(OrderStatus)),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'orders',
        timestamps: true,
      }
    );
  }
}

export { Order, OrderStatus };