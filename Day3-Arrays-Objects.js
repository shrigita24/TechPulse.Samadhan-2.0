const students = [
  { name: "Amit", marks: [78, 82, 91] },
  { name: "Riya", marks: [88, 90, 85] }
];

students.forEach(student => {
  const total = student.marks.reduce((sum, m) => sum + m, 0);
  console.log(`${student.name} - Total Marks: ${total}`);
});
