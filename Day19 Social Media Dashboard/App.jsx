import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  // create a demo user on first load
  useEffect(() => {
    axios.post(`${API}/users`, { username: "Alice" }).then((res) => setUser(res.data));
    axios.get(`${API}/posts`).then((res) => setPosts(res.data));
  }, []);

  const createPost = async () => {
    if (!text.trim()) return;
    const res = await axios.post(`${API}/posts`, { authorId: user._id, content: text });
    setPosts([res.data, ...posts]);
    setText("");
  };

  const toggleLike = async (id) => {
    const res = await axios.post(`${API}/posts/${id}/like`, { userId: user._id });
    setPosts(posts.map((p) => (p._id === id ? res.data : p)));
  };

  const addComment = async (id, comment) => {
    if (!comment.trim()) return;
    const res = await axios.post(`${API}/posts/${id}/comment`, {
      userId: user._id,
      text: comment,
    });
    setPosts(posts.map((p) => (p._id === id ? res.data : p)));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🌐 Social Dashboard</h1>

      {/* Post input */}
      <div className="mb-6 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="border rounded px-3 py-2 flex-1"
        />
        <button onClick={createPost} className="bg-blue-500 text-white px-4 rounded">
          Post
        </button>
      </div>

      {/* Posts feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post._id} className="border rounded p-4 bg-white shadow">
            <div className="flex items-center gap-2 mb-2">
              <img src={post.author.avatar} alt="" className="w-8 h-8 rounded-full" />
              <span className="font-semibold">{post.author.username}</span>
            </div>
            <p className="mb-3">{post.content}</p>

            {/* Like + Comment */}
            <div className="flex gap-4 text-sm text-gray-600 mb-2">
              <button onClick={() => toggleLike(post._id)}>
                👍 {post.likes.length} Likes
              </button>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              {post.comments.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <img src={c.user.avatar} className="w-6 h-6 rounded-full" />
                  <span className="font-semibold">{c.user.username}:</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>

            {/* Add comment */}
            <CommentBox onSubmit={(t) => addComment(post._id, t)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// 🔹 Small comment box component
function CommentBox({ onSubmit }) {
  const [val, setVal] = useState("");
  return (
    <div className="mt-2 flex gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Write a comment..."
        className="border rounded px-2 py-1 flex-1 text-sm"
      />
      <button
        onClick={() => {
          onSubmit(val);
          setVal("");
        }}
        className="text-blue-500 text-sm"
      >
        Comment
      </button>
    </div>
  );
}

export default App;
  