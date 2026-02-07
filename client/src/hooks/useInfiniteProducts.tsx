import { useState, useCallback } from 'react';
import { fetchProducts, searchProducts } from '../services/product.api';
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
    const [query, setQuery] = useState<string>('');

    const loadMore = async () => {
        if (loading || !hasMore || query) return;

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

    const handleSearch = useCallback(async (searchQuery: string) => {
        setQuery(searchQuery);
        setLoading(true);
        setError(null);

        try {
            if (!searchQuery.trim()) {
                const response = await fetchProducts();
                setProducts(response.data);
                setNextCursor(response.nextCursor);
                setHasMore(response.hasMore);
            } else {
                const results = await searchProducts(searchQuery);
                setProducts(results);
                setNextCursor(null);
                setHasMore(false);
            }
        } catch (err) {
            setError('Failed to search products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { products, hasMore, loading, error, loadMore, handleSearch };
};
