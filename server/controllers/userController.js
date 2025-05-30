const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('email name address');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memuat profil' });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const userId = req.userId; // dari middleware verifyToken
    const { kota, kecamatan, kelurahan, kodePos, alamat} = req.body;

    if (!kota || !kecamatan || !kelurahan || !kodePos || !alamat ) {
      return res.status(400).json({ message: 'Semua data alamat harus diisi' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Update data alamat
    user.address = { kota, kecamatan, kelurahan, kodePos, alamat }; // pastikan modelnya sesuai
    await user.save();

    res.status(200).json({ message: 'Alamat berhasil diperbarui' });
  } catch (error) {
    console.error('Gagal memperbarui alamat:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan alamat' });
  }
};

module.exports = {getMe, updateUserAddress };