import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/notesApp") // change URI if using Atlas
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ✅ Schema & Model
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Note = mongoose.model("Note", noteSchema);

// --- CRUD Routes ---

// Get all notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add note
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  await newNote.save();
  res.json(newNote);
});

// Update note
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updated = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  res.json(updated);
});

// Delete note
app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
