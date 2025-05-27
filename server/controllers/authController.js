const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const user = new User({ name, email, phone, password });
    await user.save();
    console.log('Menyimpan user:', user);
    res.status(201).json({ message: 'Registrasi berhasil', userId: user._id });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal registrasi' });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Email tidak ditemukan' });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(401).json({ message: 'Password salah' });

//     res.status(200).json({ message: 'Login berhasil', userId: user._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Gagal login' });
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User tidak ditemukan untuk email:', email);
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }
    console.log('User ditemukan:', user);
    const isMatch = await user.matchPassword(password);
    console.log('Password match:', password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Kirim role juga
    res.status(200).json({
      message: 'Login berhasil',
      token,
      userId: user._id,
      role: user.role,  // <- ini yang kamu butuhkan di frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal login' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal logout' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;
    console.log(userId);      

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Old and new passwords are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }

    // Ambil user dari DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Cek kecocokan oldPassword
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password lama salah' });
    }

    
    await user.save();

    res.status(200).json({ message: 'Password berhasil diubah' });
  } catch (error) {
    console.error('Error changePassword:', error);
    res.status(500).json({ message: 'Gagal mengubah password' });
  }
};

module.exports = { registerUser, login, logout, changePassword };
