import { useState } from "react";

function App() {
  // Counter state
  const [count, setCount] = useState(0);

  // Input text state
  const [text, setText] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>Day 7: State Management</h1>

      {/* Counter */}
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>➕ Increment</button>
      <button onClick={() => setCount(count - 1)}>➖ Decrement</button>
      <button onClick={() => setCount(0)}>🔄 Reset</button>

      <hr />

      {/* Live Input Preview */}
      <h2>Live Text Preview</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: "5px", marginBottom: "10px" }}
      />
      <p>You typed: {text}</p>
    </div>
  );
}

export default App;
