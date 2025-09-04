import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState(new Set());

  const socket = useMemo(() => io("http://localhost:5001"), []);

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("users:update", (list) => setUsers(list));

    socket.on("message", (msg) => setMessages((m) => [...m, msg]));

    socket.on("system", (info) =>
      setMessages((m) => [...m, { id: Date.now(), user: "system", text: info, at: new Date().toISOString() }])
    );

    socket.on("typing", ({ user, isTyping }) => {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        if (isTyping) next.add(user);
        else next.delete(user);
        return next;
      });
    });

    return () => socket.disconnect();
  }, [socket]);

  const join = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    socket.emit("join", username.trim());
  };

  // debounce-like typing indicator
  let typingTimeout;
  const handleTyping = (val) => {
    setText(val);
    socket.emit("typing", true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => socket.emit("typing", false), 800);
  };

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit("message", text.trim());
    socket.emit("typing", false);
    setText("");
  };

  if (!connected)
    return <div className="p-6">Connecting to chat server…</div>;

  if (users.length === 0 || !users.includes(username)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={join} className="bg-white p-6 rounded shadow w-80">
          <h1 className="text-xl font-bold mb-3">Join Chat</h1>
          <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Enter a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded">
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid md:grid-cols-[250px_1fr] gap-4 p-6 bg-gray-100">
      {/* Sidebar: users */}
      <aside className="bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Online</h2>
          <span className="text-sm text-gray-500">{users.length}</span>
        </div>
        <ul className="space-y-1">
          {users.map((u) => (
            <li key={u} className={`text-sm ${u === username ? "font-semibold" : ""}`}>
              {u} {typingUsers.has(u) && u !== username ? "⌨️" : ""}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat area */}
      <main className="bg-white rounded shadow flex flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <div className="font-semibold"># general</div>
          <div className="text-sm text-gray-500">You: {username}</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={m.user === "system" ? "text-center text-gray-500 text-sm" : ""}>
              {m.user !== "system" && (
                <div className="text-xs text-gray-500 mb-0.5">{m.user}</div>
              )}
              <div
                className={`inline-block px-3 py-2 rounded-2xl ${
                  m.user === username
                    ? "bg-blue-600 text-white"
                    : m.user === "system"
                    ? ""
                    : "bg-gray-200"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* typing indicator */}
        <div className="px-4 pb-1 text-xs text-gray-500 h-5">
          {Array.from(typingUsers)
            .filter((u) => u !== username)
            .slice(0, 2)
            .join(", ")}
          {typingUsers.size > 0 && typingUsers.has(username) && typingUsers.size === 1
            ? ""
            : typingUsers.size > 0
            ? " is typing…"
            : ""}
        </div>

        {/* input */}
        <form onSubmit={send} className="p-4 border-t flex gap-2">
          <input
            value={text}
            onChange={(e) => handleTyping(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
            placeholder="Type a message"
          />
          <button className="bg-blue-600 text-white px-4 rounded">Send</button>
        </form>
      </main>
    </div>
  );
}
