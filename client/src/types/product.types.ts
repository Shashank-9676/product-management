export type ProductCategory = 'ELECTRONICS' | 'CLOTHING' | 'BOOKS' | 'FOOD';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  createdAt: string;
}
