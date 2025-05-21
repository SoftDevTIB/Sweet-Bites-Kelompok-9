const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const cors = require('cors');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/productRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// prefix semua route auth dengan /api/auth
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);

// Connect ke MongoDB
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
