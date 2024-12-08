const express = require('express');
const { uploadCategory, getCategory, deleteCategory } = require('../controllers/categoryController');
const categoryRouter = express.Router();

categoryRouter.post('/api/category', uploadCategory);
 
categoryRouter.get('/api/categories', getCategory);

categoryRouter.delete('/api/deletectgry/:id', deleteCategory);

module.exports = categoryRouter;