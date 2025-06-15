const mongoose = require('mongoose');
const User = require('./models/User'); // sesuaikan path-nya
require('dotenv').config()

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI); // MONGO_URI dari Atlas di .env

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin sudah ada');
      return;
    }
    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      phone: '081234567890',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin berhasil dibuat!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
