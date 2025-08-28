// index.js

// Step 1: Import express
const express = require("express");

// Step 2: Create an app
const app = express();

// Step 3: Define a port number
const PORT = 3000;

// Step 4: Create a GET route for home
app.get("/", (req, res) => {
  res.send("Hello! Welcome to Express.js Basics 🚀");
});

// Step 5: Create a GET route that returns a list of students
app.get("/students", (req, res) => {
  const students = [
    { id: 1, name: "Rahul" },
    { id: 2, name: "Priya" },
    { id: 3, name: "Amit" },
  ];
  res.json(students);
});

// Step 6: Create a POST route (just for practice)
app.post("/students", (req, res) => {
  res.send("New student added (dummy response)");
});

// Step 7: Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
