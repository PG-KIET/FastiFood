import express from 'express';
import {getALlCategories} from '../controllers/product/category.js'
import {getProductsByCategoryId} from '../controllers/product/product.js'


const router = express.Router();

router.get('/categories', getALlCategories);

export { router as categoryRouter };

router.get('/products/:categoryId', getProductsByCategoryId);

export { router as productRouter };