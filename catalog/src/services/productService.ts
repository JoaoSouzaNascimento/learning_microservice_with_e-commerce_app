import Product from '../models/product';
import { FindOptions, WhereOptions, Op } from 'sequelize';
import { connectProducer, sendMessage } from '../kafka/producer';

class ProductService {
  static async createProduct(name: string, description: string, price: number) {
    const product = await Product.create({ name, description, price });
    
    await connectProducer();
    await sendMessage('stock-create', {id: product.id})
    
    return product;
  }

  static async getProducts(query: any) {
    const where: WhereOptions = {};

    if (query.id) {
      where.id = query.id;
    } else {
      if (query.name) {
        where.name = { [Op.like]: `%${query.name}%` };
      }

      if (query.description) {
        where.description = { [Op.like]: `%${query.description}%` };
      }

      if (query.minPrice) {
        where.price = { [Op.gte]: Number(query.minPrice) };
      }

      if (query.maxPrice) {
        where.price = { ...where.price, [Op.lte]: Number(query.maxPrice) };
      }
    }

    const limit = query.limit ? Number(query.limit) : 10;
    const offset = query.offset ? Number(query.offset) : 0;

    const options: FindOptions = {
      where,
      limit,
      offset,
    };

    return await Product.findAll(options);
  }

  static async updateProduct(id: number, updates: Partial<Product>) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return await product.update(updates);
  }

  static async deleteProduct(id: number) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
  }
}

export default ProductService;