import { ProductModel } from '../models/Product.model.js';
import type { ICursorPaginationRequest, IPaginatedResponse } from '../types/pagination.types.js';
import type { IProduct } from '../types/product.types.js';
import { PAGINATION_CONSTANTS, ProductCategory } from '../constants/app.constants.js';

export const getPaginatedProducts = async (
  params: ICursorPaginationRequest
): Promise<IPaginatedResponse<IProduct>> => {
  const { cursor, limit = PAGINATION_CONSTANTS.DEFAULT_LIMIT } = params;

  const query: Record<string, unknown> = {};

  if (cursor) {
    query._id = { $gt: cursor };
  }

  const products = await ProductModel.find(query).sort({ _id: 1 }).limit(limit + 1).exec();

  const hasMore = products.length > limit;
  const data = hasMore ? products.slice(0, limit) : products;

  const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

  return {
    data,
    nextCursor,
    hasMore,
  };
};

const validateProduct = (data: Partial<IProduct>): string | null => {
  if (!data.name || typeof data.name !== 'string') {
    return 'Invalid or missing name';
  }

  if (!data.description || typeof data.description !== 'string') {
    return 'Invalid or missing description';
  }

  if (data.price === undefined || typeof data.price !== 'number' || data.price < 0) {
    return 'Invalid or missing price';
  }

  if (data.stock === undefined || typeof data.stock !== 'number' || data.stock < 0) {
    return 'Invalid or missing stock';
  }

  if (
    !data.category ||
    !Object.values(ProductCategory).includes(data.category)
  ) {
    return 'Invalid or missing category';
  }

  return null;
};

export const createProduct = async (
  productData: Partial<IProduct>
): Promise<IProduct | string> => {
  const error = validateProduct(productData);

  if (error) {
    return error;
  }

  const product = await ProductModel.create(productData);
  return product;
};

export const searchProducts = async (query: string): Promise<IProduct[]> => {
  if (!query) {
    return [];
  }

  return ProductModel.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  }).sort({ _id: -1 }).exec();
};
