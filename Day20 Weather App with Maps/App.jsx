import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const API_KEY = "YOUR_OPENWEATHER_API_KEY"; // get from openweathermap.org

// Custom map marker
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [32, 32],
});

function App() {
  const [coords, setCoords] = useState({ lat: 28.61, lon: 77.23 }); // default Delhi
  const [weather, setWeather] = useState(null);

  // Fetch weather whenever coords change
  useEffect(() => {
    const fetchWeather = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    };
    fetchWeather();
  }, [coords]);

  // Detect user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => console.log("Location blocked, using default.")
    );
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌍 Weather App with Maps</h1>

      {weather && (
        <div className="mb-6 p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold">
            {weather.name} ({weather.sys.country})
          </h2>
          <p className="text-lg">
            🌡️ {weather.main.temp}°C — {weather.weather[0].description}
          </p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
        className="rounded-lg shadow"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[coords.lat, coords.lon]} icon={markerIcon}></Marker>
        <LocationPicker setCoords={setCoords} />
      </MapContainer>
    </div>
  );
}

// Component to handle map clicks
function LocationPicker({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lon: e.latlng.lng });
    },
  });
  return null;
}

export default App;
