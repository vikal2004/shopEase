import express from 'express';
import { upload } from '../middlewares/multerMiddleware.js';
import { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
const productRouter=express.Router();

productRouter.post('/product',upload.array("images", 5) ,addProduct);
productRouter.get('/products', getAllProduct);
productRouter.get('/:id', getProduct);
productRouter.put('/:id', upload.array("images",5),updateProduct);
productRouter.delete('/:id',deleteProduct)

export default productRouter;