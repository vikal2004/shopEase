import express from 'express';
import { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
const productRouter=express.Router();

productRouter.post('/product', addProduct);
productRouter.get('/products', getAllProduct);
productRouter.get('/:id', getProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id',deleteProduct)

export default productRouter;