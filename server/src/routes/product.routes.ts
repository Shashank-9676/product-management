import { Router } from 'express';
import { getProducts, createProduct, searchProducts } from '../controllers/product.controller.js';
import { API_ENDPOINTS } from '../constants/app.constants.js';

const router = Router();

// GET /api/products?cursor=&limit=
router.get(API_ENDPOINTS.PRODUCTS, getProducts);
router.post(API_ENDPOINTS.PRODUCTS, createProduct);
router.get(API_ENDPOINTS.SEARCH_PRODUCTS, searchProducts);
export default router;
