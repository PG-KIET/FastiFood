import express from 'express';
import {getALlCategories} from '../controllers/product/category.js'

const router = express.Router();

router.get('/categories', getALlCategories);

export { router as categoryRouter };