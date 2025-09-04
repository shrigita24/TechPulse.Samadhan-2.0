import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ DB
mongoose.connect("mongodb://127.0.0.1:27017/socialDB");

// ✅ Schemas
const userSchema = new mongoose.Schema({
  username: String,
  avatar: { type: String, default: "https://i.pravatar.cc/100" },
});
const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, text: String }
  ],
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);

// --- Routes ---

// Create user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Get all posts (with user + comments)
app.get("/posts", async (req, res) => {
  const posts = await Post.find()
    .populate("author", "username avatar")
    .populate("comments.user", "username avatar")
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Create post
app.post("/posts", async (req, res) => {
  const { authorId, content } = req.body;
  const post = new Post({ author: authorId, content });
  await post.save();
  const populated = await post.populate("author", "username avatar");
  res.json(populated);
});

// Like / Unlike
app.post("/posts/:id/like", async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.id);
  const index = post.likes.indexOf(userId);
  if (index === -1) post.likes.push(userId);
  else post.likes.splice(index, 1);
  await post.save();
  res.json(post);
});

// Add comment
app.post("/posts/:id/comment", async (req, res) => {
  const { userId, text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: userId, text });
  await post.save();
  const populated = await post.populate("comments.user", "username avatar");
  res.json(populated);
});

app.listen(5000, () => console.log("🚀 Social backend at http://localhost:5000"));
