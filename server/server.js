const express = require("express");
const app = express();
const PORT = 5000;

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const connect = require("./connect");

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "banana", "orange"] });
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Server file mulai dijalankan");
