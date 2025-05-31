const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { productName, stock, price, description } = req.body;
    const photo = req.file ? req.file.filename : null;

    const product = new Product({
      productName,
      stock,
      price,
      description,
      photo,
    });
    await product.save();

    res.status(201).json({ message: "Produk berhasil dibuat", product });
  } catch (error) {
    console.error("Error create product:", error);
    res.status(500).json({ message: "Gagal membuat produk" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { search, sortBy, order, available } = req.query;

    const filter = {};
    if (search) {
      filter.productName = { $regex: search, $options: "i" };
    }
    if (available === "true") {
      filter.stock = { $gt: 0 };
    } else if (available === "false") {
      filter.stock = { $eq: 0 };
    }

    let sort = {};
    if (sortBy) {
      const sortField =
        sortBy === "name" ? "productName" : sortBy === "price" ? "price" : null;
      if (sortField) {
        sort[sortField] = order === "desc" ? -1 : 1;
      }
    }

    const products = await Product.find(filter).sort(sort);
    res.json(products);
  } catch (error) {
    console.error("Error get products:", error);
    res.status(500).json({ message: "Gagal mengambil produk" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json(product);
  } catch (error) {
    console.error("Error get product:", error);
    res.status(500).json({ message: "Gagal mengambil produk" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productName, stock, price, description } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    product.productName = productName || product.productName;
    product.stock = stock !== undefined ? stock : product.stock;
    product.price = price !== undefined ? price : product.price;
    product.description = description || product.description;

    if (req.file) {
      product.photo = req.file.filename;
    }

    await product.save();
    res.json({ message: "Produk berhasil diperbarui", product });
  } catch (error) {
    console.error("Error update product:", error);
    res.status(500).json({ message: "Gagal memperbarui produk" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Error delete product:", error);
    res.status(500).json({ message: "Gagal menghapus produk" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
