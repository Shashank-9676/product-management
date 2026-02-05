import { ProductModel } from '../models/Product.model.js';
import type { ICursorPaginationRequest, IPaginatedResponse } from '../types/pagination.types.js';
import type { IProduct } from '../types/product.types.js';
import { PAGINATION_CONSTANTS } from '../constants/app.constants.js';

export const getPaginatedProducts = async (
  params: ICursorPaginationRequest
): Promise<IPaginatedResponse<IProduct>> => {
  const { cursor, limit = PAGINATION_CONSTANTS.DEFAULT_LIMIT } = params;

  const query: Record<string, unknown> = {};

  if (cursor) {
    query._id = { $gt: cursor };
  }

  const products = await ProductModel.find(query).sort({ _id: 1 }).limit(limit + 1)

  const hasMore = products.length > limit;

  const data = hasMore ? products.slice(0, limit) : products;

  const nextCursor = hasMore ? data[data.length - 1]._id.toString() : null;

  return {
    data,
    nextCursor,
    hasMore,
  };
};

export const createProduct = async (productData: Partial<IProduct>): Promise<IProduct> => {
  const product = await ProductModel.create(productData);
  return product;
};

export const searchProducts = async (query: string): Promise<IProduct[]> => {
  const products = await ProductModel.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  }).sort({ createdAt: -1 });
  return products;
};
