import type { IProduct } from '../types/product.types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: IProduct[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No products found.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </ul>
  );
}
