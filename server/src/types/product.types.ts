import { ProductCategory } from '../constants/app.constants.js';

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
    createdAt: Date;
}
