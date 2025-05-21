const User = require('../models/User');

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

const loginUser = async (req, res) => {
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

    // Kirim role juga
    res.status(200).json({
      message: 'Login berhasil',
      userId: user._id,
      role: user.role,  // <- ini yang kamu butuhkan di frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal login' });
  }
};

module.exports = { registerUser, loginUser };
