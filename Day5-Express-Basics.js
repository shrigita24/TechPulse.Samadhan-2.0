const express = require('express');
const app = express();

const students = [
  { name: "Amit", age: 20 },
  { name: "Riya", age: 21 }
];

app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(3000, () => {
  console.log('Express server running on http://localhost:3000');
});
