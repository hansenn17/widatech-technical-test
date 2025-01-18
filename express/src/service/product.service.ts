import { CreateProductPayload } from "../common/types/create-product-payload.types";
import { createProductDto } from "../dto/create-product.dto";
import Product from "../models/product.model";
import { ProductRepository } from "../repository/product.repository";

export class ProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(
    productData: CreateProductPayload,
    invoiceNumber?: string
  ): Promise<Product> {
    try {
      await createProductDto.validate({ ...productData });
      return this.productRepository.create(productData, invoiceNumber);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
