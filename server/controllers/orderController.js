// controllers/orderController.js
const Order = require('../models/Order');
const User  = require('../models/User');
const Product = require('../models/Product');

const generateOrderId = async () => {
  const lastOrder = await Order.findOne().sort({ orderId: -1 });
  const nextNum = lastOrder
    ? parseInt(lastOrder.orderId.replace('ORD', ''), 10) + 1
    : 1;
  return `ORD${nextNum.toString().padStart(5, '0')}`;
};

// Buat order baru (sama seperti sebelumnya)
const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems, deliveryFee, deliveryDate } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Keranjang kosong' });
    }

    const orderId = await generateOrderId();
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, deliveryFee);

    const newOrder = new Order({
      orderId,
      userId,
      orderDate: new Date(),
      deliveryDate: deliveryDate ? new Date(deliveryDate) : undefined,
      deliveryFee,
      status: 'menunggu',
      totalAmount,
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    });

    await newOrder.save();

    return res.status(201).json({
      message: 'Order berhasil dibuat',
      orderId
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Gagal membuat order' });
  }
};

// Ambil semua order (dipakai di listing, sudah di‐populate userId saja)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name'); // hanya ambil nama user
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Gagal mengambil data order' });
  }
};

// Ambil detail satu order berdasar orderId
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId })
      .populate('userId', 'name address')               // ambil name & address (jika disimpan di User)
      .populate('items.productId', 'productName price'); // ambil nama+harga produk 

    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Gagal mengambil data order' });
  }
};

// Update status pesanan (misal admin ganti status)
// PATCH /api/orders/:orderId/status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // diharapkan salah satu: Menunggu, Diproses, Dikirim, Selesai

    if (!['menunggu','diproses','dikirim','selesai'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    )
      .populate('userId', 'name address')
      .populate('items.productId', 'productName price imageUrl');

    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Gagal memperbarui status order' });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    // orders contain productId in items but no product details

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get orders', error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByUser
};
