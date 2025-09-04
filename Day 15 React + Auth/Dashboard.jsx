import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {profile ? (
        <pre className="bg-gray-200 p-4 rounded mt-4">
          {JSON.stringify(profile, null, 2)}
        </pre>
      ) : (
        "Loading..."
      )}
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
