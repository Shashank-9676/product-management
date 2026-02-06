import { API_ENDPOINTS } from '../constants/app.constants';
import type { IProduct } from '../types/product.types.js';
import type { IPaginatedResponse } from '../types/pagination.types.js';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const fetchProducts = async (
  cursor?: string,
  limit?: number
): Promise<IPaginatedResponse<IProduct>> => {
  const params = new URLSearchParams();

  if (cursor) params.append('cursor', cursor);
  if (limit) params.append('limit', String(limit));

  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
