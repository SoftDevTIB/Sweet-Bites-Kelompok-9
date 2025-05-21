const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();

const { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

console.log('typeof upload.single:', typeof upload.single);
console.log('typeof createProduct:', typeof createProduct);

// POST /api/products - buat produk baru
router.post('/', (req, res, next) => {
  console.log('Before multer');
  next();
}, upload.single('photo'), (req, res, next) => {
  console.log('After multer', req.file);
  next();
}, createProduct);



// GET /api/products - dapatkan semua produk
router.get('/', getAllProducts);

// GET /api/products/:id - dapatkan produk by id
router.get('/:id', getProductById);

// PUT /api/products/:id - update produk by id
router.put('/:id', updateProduct);

// DELETE /api/products/:id - hapus produk by id
router.delete('/:id', deleteProduct);

module.exports = router;
