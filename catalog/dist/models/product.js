"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
class Product extends sequelize_1.Model {
    static initialize(sequelize) {
        Product.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'products',
        });
    }
}
Product.initialize(database_1.default);
exports.default = Product;
