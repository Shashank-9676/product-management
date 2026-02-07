import type { Request, Response } from 'express';
import {
    getPaginatedProducts,
    createProduct as createProductService,
    searchProducts as searchProductsService,
} from '../services/product.service.js';
import { HttpStatus } from '../constants/app.constants.js';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cursor, limit } = req.query;

        const paginationParams: { cursor?: string; limit?: number } = {};
        if (typeof cursor === 'string') paginationParams.cursor = cursor;
        if (typeof limit === 'string') paginationParams.limit = Number(limit);

        const result = await getPaginatedProducts(paginationParams);

        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch products' });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void| string>  => {
    try {
        const response = await createProductService(req.body);
        if (typeof response === 'string') {
            res.status(HttpStatus.BAD_REQUEST).json({ message: response });
            return;
        }
        res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create product' });
    }
};

export const searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { q = '' } = req.query;
        if (typeof q !== 'string') {
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Search query is required' });
            return;
        }
        const response = await searchProductsService(q);
        if (typeof response === 'string') {
            res.status(HttpStatus.BAD_REQUEST).json({ message: response });
            return;
        }
        res.status(HttpStatus.OK).json(response);
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to search products' });
    }
};
