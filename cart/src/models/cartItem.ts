import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../database/database';

interface CartItemAttributes {
  userId: number;
  productId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class CartItem extends Model<CartItemAttributes> implements CartItemAttributes {
  public userId!: number;
  public productId!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    CartItem.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        productId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'cartItems',
      }
    );
  }
}

CartItem.initialize(sequelize);

export default CartItem;