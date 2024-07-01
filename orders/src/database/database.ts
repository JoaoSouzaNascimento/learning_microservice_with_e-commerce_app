import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        dialect: process.env.DB_DIALECT as Dialect,
        host: process.env.DB_HOST as string
    }
)

import { Order } from '../models/order';
import OrderItem from '../models/orderItem';
import defineAssociations from '../models/associations';

Order.initialize(sequelize);
OrderItem.initialize(sequelize);

defineAssociations();

export default sequelize;