import { GetServerSideProps } from 'next';
import Head from 'next/head';

import ProductList from '../components/ProductList';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';
import { fetchProducts } from '../services/product.api';

import type { IProduct } from '../types/product.types';
import type { IPaginatedResponse } from '../types/pagination.types';

interface HomeProps {
  initialData: IPaginatedResponse<IProduct>;
}

export default function Home({ initialData }: HomeProps) {
  const {
    products,
    hasMore,
    loading,
    loadMore,
  } = useInfiniteProducts(initialData);

  return (
    <>
      <Head>
        <title>Product Management</title>
        <meta name="description" content="Product listing with cursor pagination" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Products
        </h1>

        <ProductList products={products} />

        {loading && (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {hasMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <p className="text-center text-gray-500 mt-6">
            You have reached the end.
          </p>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const initialData = await fetchProducts();

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    return {
      props: {
        initialData: {
          data: [],
          nextCursor: null,
          hasMore: false,
        },
      },
    };
  }
};
