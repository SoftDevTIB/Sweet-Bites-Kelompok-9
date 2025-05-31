const Order = require('../models/Order');

const generateOrderId = async () => {
  const lastOrder = await Order.findOne().sort({ orderId: -1 });
  const nextNum = lastOrder
    ? parseInt(lastOrder.orderId.replace('ORD', '')) + 1
    : 1;
  return `ORD${nextNum.toString().padStart(5, '0')}`;
};

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

    res.status(201).json({
      message: 'Order berhasil dibuat',
      orderId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal membuat order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 }); // Urut terbaru dulu
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data order' });
  }
};

// Fungsi untuk dapatkan order by orderId
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan' });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data order' });
  }
};


module.exports = { createOrder, getAllOrders, getOrderById };
