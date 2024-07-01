"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const sequelize_1 = require("sequelize");
const producer_1 = require("../kafka/producer");
class ProductService {
    static createProduct(name, description, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.create({ name, description, price });
            yield (0, producer_1.connectProducer)();
            yield (0, producer_1.sendMessage)('stock-create', { id: product.id });
            return product;
        });
    }
    static getProducts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (query.id) {
                where.id = query.id;
            }
            else {
                if (query.name) {
                    where.name = { [sequelize_1.Op.like]: `%${query.name}%` };
                }
                if (query.description) {
                    where.description = { [sequelize_1.Op.like]: `%${query.description}%` };
                }
                if (query.minPrice) {
                    where.price = { [sequelize_1.Op.gte]: Number(query.minPrice) };
                }
                if (query.maxPrice) {
                    where.price = Object.assign(Object.assign({}, where.price), { [sequelize_1.Op.lte]: Number(query.maxPrice) });
                }
            }
            const limit = query.limit ? Number(query.limit) : 10;
            const offset = query.offset ? Number(query.offset) : 0;
            const options = {
                where,
                limit,
                offset,
            };
            return yield product_1.default.findAll(options);
        });
    }
    static updateProduct(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findByPk(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return yield product.update(updates);
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findByPk(id);
            if (!product) {
                throw new Error('Product not found');
            }
            yield product.destroy();
        });
    }
}
exports.default = ProductService;
