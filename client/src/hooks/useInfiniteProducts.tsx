import { useState } from 'react';
import { fetchProducts } from '../services/product.api';
import type { IProduct } from '../types/product.types';
import type { IPaginatedResponse } from '../types/pagination.types';

export const useInfiniteProducts = (
  initialData: IPaginatedResponse<IProduct>
) => {
  const [products, setProducts] = useState<IProduct[]>(initialData.data);
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialData.nextCursor
  );
  const [hasMore, setHasMore] = useState<boolean>(initialData.hasMore);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchProducts(nextCursor ?? undefined);

      setProducts((prev) => [...prev, ...response.data]);
      setNextCursor(response.nextCursor);
      setHasMore(response.hasMore);
    } catch {
      setError('Failed to load more products');
    } finally {
      setLoading(false);
    }
  };

  return { products, hasMore, loading, error, loadMore };
};
