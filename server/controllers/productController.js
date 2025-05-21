const Product = require('../models/Product');

// Create product
const createProduct = async (req, res) => {
  try {
     
    const { productName, stock, price, description } = req.body;
    const photo = req.file ? req.file.filename : null;
    
    const product = new Product({ productName, stock, price, description, photo });
    await product.save();

    res.status(201).json({ message: 'Produk berhasil dibuat', product });
  } catch (error) {
    console.error('Error create product:', error);
    res.status(500).json({ message: 'Gagal membuat produk' });
  }
};


// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error get products:', error);
    res.status(500).json({ message: 'Gagal mengambil produk' });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    res.json(product);
  } catch (error) {
    console.error('Error get product:', error);
    res.status(500).json({ message: 'Gagal mengambil produk' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { productName, stock, price, description } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    product.productName = productName || product.productName;
    product.stock = stock !== undefined ? stock : product.stock;
    product.price = price !== undefined ? price : product.price;
    product.description = description || product.description;

    if (req.file) {
      product.photo = req.file.filename; 
    }

    await product.save();
    res.json({ message: 'Produk berhasil diperbarui', product });
  } catch (error) {
    console.error('Error update product:', error);
    res.status(500).json({ message: 'Gagal memperbarui produk' });
  }
};


// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Error delete product:', error);
    res.status(500).json({ message: 'Gagal menghapus produk' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
