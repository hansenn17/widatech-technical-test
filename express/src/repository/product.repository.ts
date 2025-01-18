import { Transaction } from "sequelize";
import { CreateProductPayload } from "../common/types/create-product-payload.types";
import Product from "../models/product.model";

interface IProductRepository {
  create(
    productData: CreateProductPayload,
    invoiceNumber: string,
    transaction: Transaction
  ): Promise<Product>;
}

export class ProductRepository implements IProductRepository {
  async create(
    productData: CreateProductPayload,
    invoiceNumber?: string,
    transaction?: Transaction
  ): Promise<Product> {
    try {
      const result: Product = await Product.create(
        {
          ...productData,
          invoiceNumber,
        },
        { transaction }
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
