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

// POST /api/products - buat produk baru
router.post('/', upload.single('photo'), createProduct);


// GET /api/products - dapatkan semua produk
router.get('/', getAllProducts);

// GET /api/products/:id - dapatkan produk by id
router.get('/:id', getProductById);

// PUT /api/products/:id - update produk by id
router.put('/:id', upload.single('photo'), updateProduct);


// DELETE /api/products/:id - hapus produk by id
router.delete('/:id', deleteProduct);

module.exports = router;
