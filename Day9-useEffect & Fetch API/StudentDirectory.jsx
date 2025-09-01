import { useEffect, useState } from "react";

export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // Fetch students from backend
  const fetchStudents = () => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  };

  // Load students on first render
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add new student
  const addStudent = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age })
    })
      .then((res) => res.json())
      .then((student) => {
        setStudents([...students, student]); // update UI instantly
        setName("");
        setAge("");
      });
  };

  return (
    <div className="p-4">
      <h1>🎓 Student Directory</h1>

      {/* Add Student Form */}
      <form onSubmit={addStudent} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add Student</button>
      </form>

      {/* Student List */}
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.age} years old)
          </li>
        ))}
      </ul>
    </div>
  );
}
