import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { useState, useRef } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import ProductForm from '../components/AddProductForm';
import { useInfiniteProducts } from '../hooks/useInfiniteProducts';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
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
    handleSearch,
  } = useInfiniteProducts(initialData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver(loadMoreRef, () => {
    if (hasMore && !loading) {
      loadMore();
    }
  });

  return (
    <>
      <Head>
        <title>Product Management</title>
        <meta name="description" content="Product listing with cursor pagination" />
      </Head>

      <div className="min-h-screen bg-gray-50/50">
        {/* Header / Navbar */}
        <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ProductManager
                </h1>
              </div>

              <div className="hidden sm:flex flex-1 max-w-md mx-8">
                <SearchBar onSearch={handleSearch} />
              </div>

              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-105"
                >
                  <span className="mr-2">+</span> Add Product
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="sm:hidden pb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              All Products
              <span className="ml-3 text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                {products.length} items loaded
              </span>
            </h2>
          </div>

          <ProductList products={products} />

          {/* Sentry element for infinite scrolling */}
          <div ref={loadMoreRef} className="h-10 w-full flex justify-center items-center mt-8">
            {loading && (
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
            )}
          </div>

          {!hasMore && products.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">
                End of results
              </p>
              <div className="w-16 h-1 bg-gray-200 mx-auto mt-4 rounded-full"></div>
            </div>
          )}

          {products.length === 0 && !loading && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="mt-2 text-xl font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search terms or add a new product.</p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Create Product
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {isModalOpen && (
        <ProductForm
          onClose={() => setIsModalOpen(false)}
          onProductAdded={() => {
            window.location.reload();
          }}
        />
      )}
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
