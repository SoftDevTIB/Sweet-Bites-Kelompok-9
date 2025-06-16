const User = require('../models/User');
const Contact = require('../models/Contact');

const postContact = async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }
        const { name, email, phone, message } = req.body;
        const newContact = new Contact({ name, email, phone, message, userId });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengirim pesan' });
    }
}

module.exports = { postContact };