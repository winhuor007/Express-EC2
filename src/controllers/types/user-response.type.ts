// src/repositories/product.repository.ts
import ItemModel, { IItem } from "../../database/models/product.model";
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "./product-request.type";

class ProductRepository {
  public async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<IItem> {
    try {
      const newProduct = await ItemModel.create(productRequest);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  public async getProductById(id: string): Promise<IItem> {
    try {
      const product = await ItemModel.findById(id);
      if (!product) {
        throw new Error("Product not found!");
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  // Add this
  public async updateProduct(
    id: string,
    productRequest: ProductUpdateRequest
  ): Promise<IItem> {
    try {
      const updatedProduct = await ItemModel.findByIdAndUpdate(
        id,
        productRequest,
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error("Product not found!");
      }

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
}

// Add more repository methods as needed
export default new ProductRepository();
