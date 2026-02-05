import type { Request, Response } from 'express';
import { getPaginatedProducts } from '../services/product.service.js';
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
