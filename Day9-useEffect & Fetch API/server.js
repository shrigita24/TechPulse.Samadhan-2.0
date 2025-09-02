// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // allow frontend to access backend
app.use(express.json());

// Fake student data
let students = [
  { id: 1, name: "joe", age: 21 },
  { id: 2, name: "Bob", age: 22 },
  { id: 3, name: "Charlie", age: 20 }
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Add a new student
app.post("/students", (req, res) => {
  const newStudent = { id: students.length + 1, ...req.body };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Start server
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
