const Contact = require('../models/Contact');

const postContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newContact = new Contact({ name, email, phone, message, userId });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengirim pesan' });
    }
}

module.exports = { postContact };