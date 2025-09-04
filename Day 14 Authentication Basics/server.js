import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const PORT = 5000;
const JWT_SECRET = "supersecretkey"; // ⚠️ in real apps, use env variable

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/authDemo")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("DB error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String, // will store hashed password
});
const User = mongoose.model("User", userSchema);

// --- AUTH ROUTES ---

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "All fields required" });

  // check if user exists
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ error: "User already exists" });

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  // create JWT token
  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
});

// Protected Route Example
app.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Profile data", user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Auth server running on http://localhost:${PORT}`);
});
