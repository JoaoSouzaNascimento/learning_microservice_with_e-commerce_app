import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface StockAttributes {
  productId: number;
  quantity: number;
}

class Stock extends Model<StockAttributes> implements StockAttributes {
  public productId!: number;
  public quantity!: number;

  static initialize = (sequelize: Sequelize) => {
    Stock.init(
      {
        productId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'stocks',
      }
    );
  };
}

export default Stock;
