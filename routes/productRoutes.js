const express = require('express');
const { addProduct, newProduct, recommended, products, productsByCategory, getProductById, updateProduct, deleteProduct, availability, searchproduct, curryAndFryProducts, riceProducts } = require('../controllers/productController');
const ProductRouter = express.Router();

ProductRouter.post('/api/add-product', addProduct);

ProductRouter.get('/api/products', products);

ProductRouter.get('/api/popular', newProduct);

ProductRouter.get('/api/recommended', recommended);

ProductRouter.get('/api/category/:category', productsByCategory);

ProductRouter.get('/api/products/:id', getProductById);

ProductRouter.put('/api/products/:id', updateProduct);

ProductRouter.delete('/api/products/:productId', deleteProduct);

ProductRouter.put('/api/product/:id/availability', availability);

ProductRouter.get('/api/search', searchproduct);

ProductRouter.get('/api/curry-and-fry-products', curryAndFryProducts);

ProductRouter.get('/api/rice-products', riceProducts);

module.exports = ProductRouter;