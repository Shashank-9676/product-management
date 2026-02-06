import React from 'react';
import { IProduct } from '../types/product.types';

interface ProductCardProps {
    product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={product.name}>
                        {product.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {product.category}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2" title={product.description}>
                    {product.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
