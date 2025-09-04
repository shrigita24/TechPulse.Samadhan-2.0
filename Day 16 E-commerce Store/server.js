import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

// ✅ Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});
const Product = mongoose.model("Product", productSchema);

// --- Seed sample products ---
app.get("/seed", async (req, res) => {
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Laptop", price: 800, image: "https://via.placeholder.com/150" },
    { name: "Headphones", price: 150, image: "https://via.placeholder.com/150" },
    { name: "Keyboard", price: 50, image: "https://via.placeholder.com/150" },
  ]);
  res.json({ message: "Sample products added" });
});

// ✅ Get products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Mock checkout
app.post("/checkout", (req, res) => {
  const { cart } = req.body;
  res.json({ message: "Payment successful 💳", items: cart });
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
