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


module.exports = { createOrder };
