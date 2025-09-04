import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager");

// ✅ Schema
const taskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
});
const Task = mongoose.model("Task", taskSchema);

// --- Routes ---

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });
  await task.save();
  res.json(task);
});

// Update task status (drag & drop)
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => console.log("🚀 Server: http://localhost:5000"));
