import { SortOrder } from "mongoose";
import ItemModel, { IItem } from "../../database/models/product.model";
import {
  ProductGetAllRepoParams,
  ProductSortParams,
} from "./types/product-repository.type"; // Assuming this type exists
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "../../controllers/types/product-request.type";

class ProductRepository {
  // Fetch all products with pagination, sorting, and filtering
  public async getAllProducts(queries: ProductGetAllRepoParams): Promise<{
    totalItems: number;
    totalPages: number;
    currentPage: number;
    products: IItem[];
  }> {
    const {
      page = 1,
      limit = 10,
      filter = {},
      sort = { name: "asc" },
    } = queries;

    const sortFields = Object.keys(sort).reduce((acc, key) => {
      const direction = sort[key as keyof ProductSortParams];
      acc[key as keyof ProductSortParams] = direction === "asc" ? 1 : -1;
      return acc;
    }, {} as Record<keyof ProductSortParams, SortOrder>);

    const buildFilter = (filter: Record<string, any>) => {
      const mongoFilter: Record<string, any> = {};
      for (const key in filter) {
        if (typeof filter[key] === "object" && filter[key] !== null) {
          if (filter[key].min || filter[key].max) {
            mongoFilter[key] = {};
            if (filter[key].min !== undefined) {
              mongoFilter[key].$gte = filter[key].min;
            }
            if (filter[key].max !== undefined) {
              mongoFilter[key].$lte = filter[key].max;
            }
          } else {
            mongoFilter[key] = filter[key];
          }
        } else {
          mongoFilter[key] = filter[key];
        }
      }
      return mongoFilter;
    };

    try {
      const mongoFilter = buildFilter(filter);
      const products = await ItemModel.find(mongoFilter)
        .sort(sortFields)
        .skip((page - 1) * limit)
        .limit(limit);

      const totalItems = await ItemModel.countDocuments(mongoFilter);

      return {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        products,
      };
    } catch (error) {
      console.error(
        `ProductRepository - getAllProducts() method error: ${error}`
      );
      throw error;
    }
  }

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

  public async deleteProduct(id: string): Promise<void> {
    try {
      const deleteProduct = await ItemModel.findByIdAndDelete(id);

      if (!deleteProduct) {
        throw new Error("Product not found!");
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();
