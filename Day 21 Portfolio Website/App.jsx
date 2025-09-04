import { useState } from "react";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent ✅ (hook up EmailJS or backend for real messages)");
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-5xl font-bold">Hi, I’m Shree 👋</h1>
        <p className="mt-4 text-xl">Aspiring Full-Stack Developer | AI Enthusiast</p>
        <a
          href="#projects"
          className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow hover:bg-gray-100"
        >
          View My Work
        </a>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p>
          I’m a developer passionate about AI, web apps, and building tools that solve real-world problems. 
          Skilled in React, Node.js, and databases. I love learning and sharing knowledge.
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Task Manager", desc: "Full-stack CRUD with drag & drop", link: "#" },
            { title: "Weather App", desc: "React + API + Maps", link: "#" },
            { title: "Chat App", desc: "Real-time messaging with Socket.io", link: "#" },
          ].map((p, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-600">{p.desc}</p>
              <a href={p.link} className="mt-3 inline-block text-blue-600 font-medium hover:underline">
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            rows="5"
            required
          />
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-200">
        © {new Date().getFullYear()} Shree | Built with ❤️ using React & Tailwind
      </footer>
    </div>
  );
}

export default App;
