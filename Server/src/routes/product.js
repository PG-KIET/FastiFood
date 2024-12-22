import express from 'express';
import {getProductsByCategoryId, searchProducts} from '../controllers/product/product.js'



const router = express.Router();

router.get('/products/:categoryId', getProductsByCategoryId);
router.get('/products/search/:searchTerm' , searchProducts);

export { router as productRouter };





