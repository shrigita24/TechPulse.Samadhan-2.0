import { useEffect, useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch notes
  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  // Add note
  const addNote = () => {
    if (!title || !content) return;

    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((newNote) => setNotes([...notes, newNote]));

    setTitle("");
    setContent("");
  };

  // Delete note
  const deleteNote = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" })
      .then(() => setNotes(notes.filter((n) => n._id !== id)));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Notes App 📝</h1>

      {/* Input form */}
      <div className="flex flex-col gap-2 mb-4 w-80">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content"
          className="border p-2 rounded"
        />
        <button
          onClick={addNote}
          className="bg-green-600 text-white py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* Notes list */}
      <ul className="w-80">
        {notes.map((n) => (
          <li
            key={n._id}
            className="bg-white p-3 mb-2 rounded shadow flex justify-between"
          >
            <div>
              <h2 className="font-bold">{n.title}</h2>
              <p>{n.content}</p>
            </div>
            <button
              onClick={() => deleteNote(n._id)}
              className="text-red-600"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
