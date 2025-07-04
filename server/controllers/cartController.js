const Cart = require('../models/Cart');

// GET cart by userId
const getCart = async (req, res) => {
  const userId = req.userId;
  try {
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get cart' });
  }
};

// ADD or UPDATE item in cart
const addToCart = async (req, res) => {
  const userId = req.userId;
  const { productId, name, price, imageUrl, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const index = cart.items.findIndex(item => item.productId.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity = quantity;
    } else {
      cart.items.push({ productId, name, price, imageUrl, quantity });
    }

    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update cart' });
  }
};

// REMOVE item
const removeFromCart = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } }, $set: { updatedAt: new Date() } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item' });
  }
};




const updateQuantity = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const index = cart.items.findIndex(item => item.productId.toString() === productId);
    if (index > -1) {
      cart.items[index].quantity = quantity;
      cart.updatedAt = new Date();
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update quantity' });
  }
};

const overwriteCart = async (req, res) => {
  try {
    const userId = req.userId;
    const items = req.body.items;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items harus berupa array' });
    }

    // Upsert: jika belum ada, buat baru; kalau sudah ada, replace items-nya
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { 
        items: items.map(i => ({
          productId:    i.productId,
          name:         i.name,
          price:        i.price,
          imageUrl:     i.imageUrl,
          quantity:     i.quantity
        })),
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error overwrite cart' });
  }
};


module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  overwriteCart
};
