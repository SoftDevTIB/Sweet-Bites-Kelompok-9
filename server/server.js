const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// prefix semua route auth dengan /api/auth
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);

// New endpoint to receive order data
app.post("/api/orders", (req, res) => {
  const { kota, alamat, kodePos, cartItems } = req.body;
  console.log("Received order:");
  console.log("Kota:", kota);
  console.log("Alamat:", alamat);
  console.log("Kode Pos:", kodePos);
  console.log("Cart Items:", cartItems);

  // Here you can add logic to save the order to a database

  res.status(201).json({ message: "Order received successfully" });
});

// Connect ke MongoDB
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
